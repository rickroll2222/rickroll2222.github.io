var imported = document.createElement('script');
var HostAdsenseId = "ca-host-pub-6129580795478709";
var AdsenseId     = "ca-pub-1246722717023584";
var adFrequency   = "180s";
var ChannelId     = "3582952985";
var testAdsOn     = false;

let adsReady = false;

window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function(o){ adsbygoogle.push(o); };

adConfig({
  sound: 'on',
  preloadAdBreaks: 'on',
  onReady: () => { adsReady = true; },
});

/* ---------------- Unity bridge ---------------- */
const GO_NAME = 'IDNET(Idnet.cs)'; // GameObject name

let _cachedInstance = null;
function getUnity() {
  if (_cachedInstance && typeof _cachedInstance.SendMessage === 'function') return _cachedInstance;
  const ui = window.unityInstance || window.gameInstance;
  if (ui && typeof ui.SendMessage === 'function') return (_cachedInstance = ui);
  if (typeof window.SendMessage === 'function')   return (_cachedInstance = { SendMessage: window.SendMessage });
  return null;
}

function sendUnity(method, arg) {
  const ui = getUnity();
  if (!ui) { console.warn(`[unity-bridge] Unity not ready: ${method}(${arg ?? ''})`); return false; }
  try {
    (typeof arg === 'undefined') ? ui.SendMessage(GO_NAME, method)
                                 : ui.SendMessage(GO_NAME, method, String(arg));
    return true;
  } catch (e) {
    console.error(`[unity-bridge] SendMessage failed: ${method}`, e);
    return false;
  }
}

/* ---------------- Helpers ---------------- */
function toBool(v) {
  if (typeof v === 'boolean') return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

function setTimeScale(value, allowGamePause) {
  sendUnity('SetAudio', value);
  if (allowGamePause) sendUnity('SetTimeScale', value);
}
function setRewardCallBack(value)   { sendUnity('SetRewardCallback', value); }
function EnableRewardLoader()       { sendUnity('EnableRewardLoader'); }
function DisableRewardLoader()      { sendUnity('DisableRewardLoader'); }
function sendToUnity_AdShown(resp)  { sendUnity('AdShown', resp); }

/* ---------------- Interstitial (counts as shown only when visible) ---------------- */
function interstitial(interstitialType, interstitialName, allowGamePauseBool) {
  // If ad system not ready yet, just resume & focus.
  if (!adsReady) {
    setTimeScale('1', allowGamePauseBool);
    window.focus();
    return;
  }

  let reportedShown = false;

  adBreak({
    type: interstitialType,
    name: interstitialName,

    beforeAd: () => { setTimeScale('0', allowGamePauseBool); },

    // Fires only if an ad actually became visible
    afterAd: () => {
      if (!reportedShown) { sendToUnity_AdShown('shown'); reportedShown = true; }
    },

    adBreakDone: (placementInfo) => {
      // Fallback: if afterAd didn't fire but an ad DID show
      const s = placementInfo && placementInfo.breakStatus;
      if (!reportedShown && (s === 'viewed' || s === 'dismissed')) {
        sendToUnity_AdShown('shown'); reportedShown = true;
      }
      setTimeScale('1', allowGamePauseBool);
      window.focus();
    },
  });
}

/* ---------------- Rewarded (fallback only if neither viewed/dismissed fired) ---------------- */
function reward(allowGamePauseBool) {
  // If ad system not ready yet, report false and resume.
  if (!adsReady) {
    setRewardCallBack('false'); // no ad / failed early
    DisableRewardLoader();
    setTimeScale('1', allowGamePauseBool);
    window.focus();
    return;
  }

  let outcomeHandled = false;

  adBreak({
    type: 'reward',
    name: 'rewarded-ad',

    beforeAd: () => {
      DisableRewardLoader();
      setTimeScale('0', allowGamePauseBool);
    },

    beforeReward: (showAdFn) => { showAdFn(0); },

    adViewed:    () => { outcomeHandled = true; setRewardCallBack('true');  },
    adDismissed: () => { outcomeHandled = true; setRewardCallBack('false'); },

    afterAd: () => { /* resume handled in Done */ },

    adBreakDone: () => {
      if (!outcomeHandled) setRewardCallBack('false'); // no ad / failed early
      DisableRewardLoader();
      setTimeScale('1', allowGamePauseBool);
      window.focus();
    },
  });
}

/* ---------------- Externals expected by your jslib ---------------- */
// jslib: IdnetInitExternEval -> InitExternEval(appId)
window.InitExternEval = function(appId) {
  getUnity();
};

// jslib: IdnetY8ExternEval -> Y8ExternEval(allowGamePause, interstitialType, interstitialName) (string,bool,bool)
window.Y8ExternEval = function(allowGamePause, interstitialType, interstitialName) {
  const allowPause = toBool(allowGamePause);
  interstitial(interstitialType, interstitialName, allowPause);
};

// jslib: IdnetY8ExternEvalReward -> Y8ExternEvalReward(allowGamePause) (string)
window.Y8ExternEvalReward = function(allowGamePause) {
  const allowPause = toBool(allowGamePause);
  reward(allowPause);
};

/* ---------------- Load AdSense runtime ---------------- */
function createAFGScript() {
  imported.setAttribute('data-ad-host', HostAdsenseId);
  imported.setAttribute('data-ad-client', AdsenseId);
  // imported.setAttribute('data-ad-channel', ChannelId);
  if (testAdsOn === true) imported.setAttribute('data-adbreak-test', 'on');
  imported.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  imported.type = 'text/javascript';
  imported.async = true;
  document.head.appendChild(imported);
}
createAFGScript();
