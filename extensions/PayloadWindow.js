/* TrixTech s.r.o. @2026 */
(function (window, document) {

  var UX = {
    dwellMs: 30000,
    longStayMs: 60000,
    minScrollPct: 30,
    showDelayMs: 400,
    bootWindowMs: 3000,
    closeCooldownMs: 10000,
    enforceEveryMs: 1000,
    autoHideMs: 90000,
    reShowDelayMs: 8000,
    sessionTimeoutMs: 300000,
    autoReShowMs: 180000,
    chatInteractDelayMs: 800,
    vfReadyDelayMs: 3000
  };

  var SS = {
    SUPPRESS: 'morice_payload_suppressed_session',
    PAYLOAD_DISMISSED: 'morice_payload_dismissed_by_user',
    CHAT_OPEN: 'morice_chat_is_open',
    USER_OPENED_CHAT: 'morice_user_opened_chat',
    CHAT_CLOSED_TIME: 'morice_chat_closed_time',
    SHOW_COUNT: 'morice_show_count',
    LAST_SHOW_TIME: 'morice_last_show_time',
    SESSION_START: 'morice_session_start'
  };

  var LS = {
    LAST_CLOSE: 'morice_last_close_at',
    TOTAL_VISITS: 'morice_total_visits',
    LAST_VISIT: 'morice_last_visit'
  };

  var MSG = {
    default: {
      morning: 'Dobré ráno! Jsem AI asistent Mořic. Jak vám mohu pomoci?',
      day:     'Dobrý den! Jsem AI asistent Mořic. Jak vám mohu pomoci?',
      night:   'Dobrý večer! Jsem AI asistent Mořic. Jak vám mohu pomoci?'
    },
    deep: {
      morning: 'Hledáte něco konkrétního? Rád vám to rychle najdu.',
      day:     'Hledáte něco konkrétního? Rád vám to rychle najdu.',
      night:   'Hledáte něco konkrétního? Rád vám to rychle najdu.'
    },
    linger: {
      morning: 'Stále tu jsem, pokud potřebujete s čímkoli poradit.',
      day:     'Stále tu jsem, pokud potřebujete s čímkoli poradit.',
      night:   'Stále tu jsem, pokud potřebujete s čímkoli poradit.'
    },
    return_short: {
      morning: 'Máte ještě nějaký dotaz? Rád vám s ním pomohu.',
      day:     'Máte ještě nějaký dotaz? Rád vám s ním pomohu.',
      night:   'Máte ještě nějaký dotaz? Rád vám s ním pomohu.'
    },
    return_medium: {
      morning: 'Vítejte zpět! Kdykoli se můžete zeptat na cokoli.',
      day:     'Vítejte zpět! Kdykoli se můžete zeptat na cokoli.',
      night:   'Vítejte zpět! Kdykoli se můžete zeptat na cokoli.'
    },
    return_long: {
      morning: 'Vítejte zpět. Potřebujete ještě něco zjistit o Mořicích?',
      day:     'Vítejte zpět. Potřebujete ještě něco zjistit o Mořicích?',
      night:   'Vítejte zpět. Potřebujete ještě něco zjistit o Mořicích?'
    },
    session_expired: {
      morning: 'Dobré ráno, začněme znovu. Jak vám mohu pomoci?',
      day:     'Dobrý den, začněme znovu. Jak vám mohu pomoci?',
      night:   'Dobrý večer, začněme znovu. Jak vám mohu pomoci?'
    },
    idle_reminder: {
      morning: 'Pomohu s informacemi o Mořicích, úřadu i kontaktech.',
      day:     'Pomohu s informacemi o Mořicích, úřadu i kontaktech.',
      night:   'Pomohu s informacemi o Mořicích, úřadu i kontaktech.'
    },
    final_attempt: {
      morning: 'Stále něco hledáte? Zkusme to najít společně.',
      day:     'Stále něco hledáte? Zkusme to najít společně.',
      night:   'Stále něco hledáte? Zkusme to najít společně.'
    }
  };

  var CSS = `
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-700-normal.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-700-normal.woff') format('woff');
}
@font-face {
  font-family: 'Carlito';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('https://cdn.jsdelivr.net/fontsource/fonts/carlito@latest/latin-400-normal.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/fontsource/fonts/carlito@latest/latin-400-normal.woff') format('woff');
}
@font-face {
  font-family: 'Carlito';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('https://cdn.jsdelivr.net/fontsource/fonts/carlito@latest/latin-700-normal.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/fontsource/fonts/carlito@latest/latin-700-normal.woff') format('woff');
}
* {
  font-family: 'Carlito', sans-serif !important;
}
#morice-cta,
#morice-cta *,
#morice-cta *::before,
#morice-cta *::after {
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: 'Carlito', sans-serif !important;
  line-height: normal !important;
  letter-spacing: normal !important;
  text-transform: none !important;
  text-decoration: none !important;
  list-style: none !important;
  border-collapse: collapse !important;
  vertical-align: baseline !important;
  color: #FFF !important;
}
:root {
  --morice-primary: #223C83;
  --morice-primary-hover: #223C83;
  --morice-border: #EFEFEF;
  --morice-text: #0B1720;
  --morice-bg: #FFFFFF;
  --morice-card-w: 240px;
  --morice-launcher-size: 120px;
  --morice-font: 'Carlito', sans-serif;
  --morice-avatar-size: 96px;
  --morice-avatar-margin: 6px 0;
  --morice-bottom: 100px;
}
#morice-cta.morice-cta {
  position: fixed !important;
  right: 18px !important;
  bottom: var(--morice-bottom, 100px) !important;
  z-index: 999999 !important;
  opacity: 0 !important;
  transform: translateY(8px) scale(.98) !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: opacity .2s ease, transform .2s ease, visibility 0s linear .2s !important;
  font-family: var(--morice-font) !important;
  margin: 0 !important;
  padding: 0 !important;
  width: auto !important;
  height: auto !important;
  max-width: none !important;
  max-height: none !important;
  min-width: 0 !important;
  min-height: 0 !important;
  float: none !important;
  clear: both !important;
  display: block !important;
}
#morice-cta.morice-cta.is-in {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
  visibility: visible !important;
  pointer-events: auto !important;
}
#morice-cta.morice-cta.is-out {
  opacity: 0 !important;
  transform: translateY(8px) scale(.98) !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: opacity .16s ease, transform .16s ease, visibility 0s linear .16s !important;
}
#morice-cta .morice-card {
  position: relative !important;
  width: 240px !important;
  max-width: 240px !important;
  min-width: 240px !important;
  background: linear-gradient(180deg, #FFFFFF 0%, #AEBEEA 100%) !important;
  color: #0B1720 !important;
  border: 0 !important;
  border-radius: 16px !important;
  padding: 14px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  box-shadow: 0 16px 32px -16px rgba(0,0,0,.28) !important;
  font-family: var(--morice-font) !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  overflow: visible !important;
  float: none !important;
  clear: both !important;
}
#morice-cta .morice-header {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  margin: 0 !important;
  padding: var(--morice-avatar-margin, 6px 0) !important;
  width: 100% !important;
  box-sizing: border-box !important;
}
#morice-cta .morice-avatar {
  width: var(--morice-avatar-size, 96px) !important;
  height: auto !important;
  flex: 0 0 auto !important;
  max-width: var(--morice-avatar-size, 96px) !important;
  max-height: none !important;
  min-width: unset !important;
  min-height: unset !important;
  object-fit: contain !important;
  border-radius: 0 !important;
  background: transparent !important;
  user-select: none !important;
  -webkit-user-drag: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}
#morice-cta .morice-title {
  font-size: 16px !important;
  font-weight: 400 !important;
  font-family: 'Carlito', sans-serif !important;
  line-height: 1.1 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  margin: 0 !important;
  padding: 0 !important;
  flex: 1 1 auto !important;
}
#morice-cta .morice-title-accent {
  color: #000000 !important;
  font-family: 'Carlito', sans-serif !important;
  font-weight: 400 !important;
  font-size: 18px !important;
}
#morice-cta .morice-title-rest {
  display: none !important;
}
#morice-cta .morice-desc {
  margin: 2px 0 4px !important;
  font-size: 15px !important;
  line-height: 1.35 !important;
  color: #0B1720 !important;
  padding: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  font-weight: 400 !important;
}
#morice-cta #morice-open.morice-btn {
  position: relative !important;
  overflow: hidden !important;
  padding: 10px 18px !important;
  border: 0 !important;
  border-radius: 15px !important;
  font-family: 'Poppins', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: .05em !important;
  font-size: 16px !important;
  cursor: pointer !important;
  background: #FFFFFF !important;
  border: 2px solid #223C83 !important;
  color: #223C83 !important;
  transition: background .2s ease, color .2s ease, border-color .2s ease !important;
  margin: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  text-decoration: none !important;
  line-height: normal !important;
}
#morice-cta #morice-open.morice-btn .morice-label,
#morice-cta #morice-open.morice-btn span {
  color: #223C83 !important;
}
#morice-cta #morice-open.morice-btn:active {
  transform: translateY(1px) !important;
}
#morice-cta #morice-open.morice-btn:hover {
  background: #223C83 !important;
  border: 2px solid #223C83 !important;
  color: #FFFFFF !important;
}
#morice-cta #morice-open.morice-btn:hover .morice-label,
#morice-cta #morice-open.morice-btn:hover span {
  color: #FFFFFF !important;
}
#morice-cta #morice-open.morice-btn:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(0,123,204,.25) !important;
}
#morice-cta #morice-close.morice-close {
  position: absolute !important;
  top: -10px !important;
  right: -10px !important;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  border-radius: 999px !important;
  border: 1px solid rgba(0,0,0,.15) !important;
  background: #FFF !important;
  color: #0B1720 !important;
  cursor: pointer !important;
  font-size: 14px !important;
  line-height: 1 !important;
  display: grid !important;
  place-items: center !important;
  box-shadow: 0 8px 16px -10px rgba(0,0,0,.25) !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  text-align: center !important;
}
#morice-cta .morice-avatar,
#morice-cta .morice-btn,
#morice-cta .morice-close,
#morice-cta .morice-card,
#morice-cta .morice-cta,
#morice-cta img {
  -webkit-user-drag: none !important;
  user-select: none !important;
}
@media (max-width: 768px) {
  #morice-cta.morice-cta {
    right: 20px !important;
    left: auto !important;
    bottom: calc(80px + 20px) !important;
    transform: translateY(8px) scale(.98) !important;
  }
  #morice-cta.morice-cta.is-in {
    opacity: 1 !important;
    transform: translateY(0) scale(1) !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
  #morice-cta.morice-cta.is-out {
    opacity: 0 !important;
    transform: translateY(8px) scale(.98) !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  #morice-cta .morice-card {
    width: calc(100vw - 32px) !important;
    max-width: 240px !important;
    min-width: auto !important;
    margin: 0 !important;
  }
  #morice-cta .morice-title {
    font-size: 15px !important;
  }
  #morice-cta .morice-desc {
    font-size: 14px !important;
  }
  #morice-cta #morice-open.morice-btn {
    padding: 12px 20px !important;
    font-size: 16px !important;
  }
}
@media (max-width: 480px) {
  #morice-cta.morice-cta {
    right: 12px !important;
    left: auto !important;
    bottom: calc(70px + 16px) !important;
  }
  #morice-cta .morice-card {
    width: calc(100vw - 24px) !important;
    max-width: 100% !important;
    min-width: auto !important;
    padding: 12px !important;
    border-radius: 14px !important;
  }
  #morice-cta .morice-avatar {
    width: 56px !important;
    max-width: 56px !important;
  }
  #morice-cta .morice-title {
    font-size: 14px !important;
  }
  #morice-cta .morice-desc {
    font-size: 13.5px !important;
    line-height: 1.4 !important;
  }
  #morice-cta #morice-open.morice-btn {
    padding: 11px 18px !important;
    font-size: 15px !important;
    border-radius: 15px !important;
  }
}
  `.trim();

  var now = function() { return Date.now(); };
  var getSS = function(k) { return sessionStorage.getItem(k); };
  var setSS = function(k, v) { sessionStorage.setItem(k, String(v)); };
  var rmSS = function(k) { sessionStorage.removeItem(k); };
  var getLS = function(k) { return localStorage.getItem(k); };
  var setLS = function(k, v) { localStorage.setItem(k, String(v)); };
  var within = function(ts, ms) { return ts && (now() - Number(ts) < ms); };

  var ctaEl, btnOpenEl, btnCloseEl, descEl, visible = false;
  var metDwell = false, metScroll = false, deepScroll = false, longStay = false;
  var dwellTimer = null, longTimer = null, enforceTimer = null, boot = true, vfReady = false;
  var vfReadyTime = null;
  var chatOpen = false;
  var autoHideTimer = null, reShowTimer = null;
  var showCount = 0, sessionStart = now();
  var autoHideWasTimer = false;
  var currentMessageType = null;
  var messageLocked = false;

  function scheduleAutoReShow() {
    clearTimeout(reShowTimer);
    reShowTimer = setTimeout(function() {
      var sessionChatOpen = getSS(SS.CHAT_OPEN) === '1';
      var chatVisible = detectChatVisible();
      if (!chatOpen && !chatVisible && !sessionChatOpen) {
        rmSS(SS.SUPPRESS);
        updateMessage();
        showCTA({ deepScroll: deepScroll, longStay: longStay });
      }
    }, UX.autoReShowMs);
  }

  function injectCSS() {
    if (document.querySelector('style[data-payloadwindow-style]')) return;
    var s = document.createElement('style');
    s.setAttribute('data-payloadwindow-style', '1');
    s.appendChild(document.createTextNode(CSS));
    document.head.appendChild(s);
  }

  function injectCTA() {
    if (document.getElementById('morice-cta')) return;

    var timeOfDay = getTimeOfDay();
    var defaultMsg = MSG.default[timeOfDay] || MSG.default.day;

    var wrap = document.createElement('div');
    wrap.innerHTML = [
      '<div class="morice-cta" id="morice-cta" aria-live="polite" aria-hidden="true" style="display:none">',
      '  <div class="morice-card">',
      '    <button class="morice-close" id="morice-close" aria-label="Skrýt">×</button>',
      '    <div class="morice-header">',
      '      <img class="morice-avatar" src="https://trixtecheu.github.io/morice-assistant-assets/images/morice-ai-assistant.png" alt="" draggable="false" ondragstart="return false;">',
      '      <span class="morice-title"><span class="morice-title-accent">se zeptej!</span></span>',
      '    </div>',
      '    <p class="morice-desc" id="morice-text">' + defaultMsg + '</p>',
      '    <button id="morice-open" class="morice-btn" aria-label="Otevřít AI asistenta obce Mořice"><span class="morice-label">ZEPTAT SE</span></button>',
      '  </div>',
      '</div>'
    ].join('\n');
    document.body.appendChild(wrap.firstChild);
  }

  function getTimeOfDay() {
    var hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'day';
    return 'night';
  }

  function pickMessage(ctx, forceUpdate) {
    if (messageLocked && !forceUpdate && currentMessageType) {
      var tod = getTimeOfDay();
      return (MSG[currentMessageType] && MSG[currentMessageType][tod]) || MSG.default[tod] || MSG.default.day;
    }

    var timeOfDay = getTimeOfDay();
    var chatClosedTime = getSS(SS.CHAT_CLOSED_TIME);
    var messageType = 'default';

    if (!chatClosedTime) {
      if (showCount === 0) {
        messageType = 'default';
      } else if (ctx && ctx.deepScroll && !visible) {
        messageType = 'deep';
      } else if (ctx && ctx.longStay && !visible) {
        messageType = 'linger';
      }
    } else {
      var timeSinceClose = now() - Number(chatClosedTime);
      if (timeSinceClose < 60000) {
        messageType = 'return_short';
      } else if (timeSinceClose < 300000) {
        messageType = 'return_medium';
      } else if (timeSinceClose < 600000) {
        messageType = 'return_long';
      } else {
        var sessionAge = now() - sessionStart;
        if (sessionAge > UX.sessionTimeoutMs) {
          messageType = 'session_expired';
        } else if (showCount > 3) {
          messageType = 'final_attempt';
        } else if (ctx && ctx.longStay) {
          messageType = 'idle_reminder';
        } else {
          messageType = 'return_medium';
        }
      }
    }

    if (!messageLocked || forceUpdate) currentMessageType = messageType;
    return (MSG[messageType] && MSG[messageType][timeOfDay]) || MSG.default[timeOfDay] || MSG.default.day;
  }

  function updateMessage(forceUpdate) {
    if (!descEl) return;
    descEl.textContent = pickMessage({ deepScroll: deepScroll, longStay: longStay }, forceUpdate);
  }

  function detectChatVisible() {
    if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.isOpen === 'function') {
      try { return window.voiceflow.chat.isOpen(); } catch (e) {}
    }
    var launcher = document.querySelector('.vfrc-launcher, button.vfrc-launcher');
    if (launcher) {
      var cs = window.getComputedStyle(launcher);
      var rect = launcher.getBoundingClientRect();
      return !(cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0' && rect.width > 10);
    }
    return false;
  }

  function canShow() {
    if (!vfReady || !window.voiceflow || !window.voiceflow.chat) return false;
    if (detectChatVisible()) return false;
    if (getSS(SS.CHAT_OPEN) === '1') return false;
    if (getSS(SS.SUPPRESS) === '1') return false;
    if (getSS(SS.PAYLOAD_DISMISSED) === '1') return false;
    if (chatOpen) return false;

    var chatClosedTime = getSS(SS.CHAT_CLOSED_TIME);
    var longClosed = chatClosedTime && (now() - Number(chatClosedTime) > 120000);
    if (!longClosed && !metDwell && !metScroll) return false;
    if (within(getLS(LS.LAST_CLOSE), UX.closeCooldownMs)) return false;
    return true;
  }

  function showCTA(ctx) {
    if (chatOpen || detectChatVisible() || !ctaEl || visible || !canShow()) return;
    if (detectChatVisible()) { chatOpen = true; setSS(SS.CHAT_OPEN, '1'); return; }

    visible = true;
    messageLocked = true;
    showCount++;
    setSS(SS.SHOW_COUNT, String(showCount));
    setSS(SS.LAST_SHOW_TIME, String(now()));

    ctaEl.style.display = '';
    ctaEl.classList.remove('is-out');
    ctaEl.classList.add('is-in');
    ctaEl.removeAttribute('aria-hidden');

    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(function() {
      if (visible && !chatOpen && !detectChatVisible()) {
        autoHideWasTimer = true;
        hideCTA();
        setSS(SS.SUPPRESS, '1');
        scheduleAutoReShow();
      }
    }, UX.autoHideMs);
  }

  function hideCTA() {
    if (!ctaEl || !visible) return;
    visible = false;
    messageLocked = false;
    currentMessageType = null;
    clearTimeout(autoHideTimer);
    ctaEl.classList.add('is-out');
    var done = function() {
      ctaEl.style.display = 'none';
      ctaEl.setAttribute('aria-hidden', 'true');
      ctaEl.removeEventListener('transitionend', done);
    };
    ctaEl.addEventListener('transitionend', done);
    setTimeout(done, 160);
    if (!autoHideWasTimer) return;
    autoHideWasTimer = false;
  }

  function scheduleDwell() {
    clearTimeout(dwellTimer);
    dwellTimer = setTimeout(function() { metDwell = true; maybeShow(); }, UX.dwellMs);
  }

  function scheduleLongStay() {
    clearTimeout(longTimer);
    longTimer = setTimeout(function() {
      longStay = true;
      if (!messageLocked) updateMessage();
      maybeShow();
    }, UX.longStayMs);
  }

  function watchScroll() {
    var onScroll = function() {
      var sc = (scrollY + innerHeight) / Math.max(1, document.documentElement.scrollHeight) * 100;
      if (sc >= UX.minScrollPct) metScroll = true;
      if (sc >= 65) deepScroll = true;
      if (metScroll) { removeEventListener('scroll', onScroll); maybeShow(); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function maybeShow() {
    if (chatOpen || detectChatVisible()) {
      if (detectChatVisible()) { chatOpen = true; setSS(SS.CHAT_OPEN, '1'); }
      return;
    }
    if (!canShow()) return;

    var ctx = { deepScroll: deepScroll, longStay: longStay };
    var chatClosedTime = getSS(SS.CHAT_CLOSED_TIME);
    var messageType = 'default';

    if (!chatClosedTime) {
      if (showCount > 0 && deepScroll) messageType = 'deep';
      else if (showCount > 0 && longStay) messageType = 'linger';
    } else {
      var timeSinceClose = now() - Number(chatClosedTime);
      if (timeSinceClose < 60000) messageType = 'return_short';
      else if (timeSinceClose < 300000) messageType = 'return_medium';
      else if (timeSinceClose < 600000) messageType = 'return_long';
      else {
        var sessionAge = now() - sessionStart;
        if (sessionAge > UX.sessionTimeoutMs) messageType = 'session_expired';
        else if (showCount > 3) messageType = 'final_attempt';
        else if (longStay) messageType = 'idle_reminder';
        else messageType = 'return_medium';
      }
    }

    var delay = getDelayForMessageType(messageType, ctx);

    if (vfReadyTime) {
      var timeSinceVFReady = now() - vfReadyTime;
      var minDelayAfterVF = 5000;
      if (timeSinceVFReady < minDelayAfterVF) {
        setTimeout(function() {
          if (!chatOpen && !detectChatVisible() && canShow()) {
            updateMessage();
            setTimeout(function() { if (!chatOpen && !detectChatVisible()) showCTA(ctx); }, delay);
          }
        }, minDelayAfterVF - timeSinceVFReady);
        return;
      }
    }

    updateMessage();
    setTimeout(function() { if (!chatOpen && !detectChatVisible()) showCTA(ctx); }, delay);
  }

  function startEnforcer() {
    clearInterval(enforceTimer);
    enforceTimer = setInterval(function() {
      var openNow = detectChatVisible();
      var wasChatOpen = chatOpen;
      var sessionChatOpen = getSS(SS.CHAT_OPEN) === '1';

      if (openNow || chatOpen || sessionChatOpen) {
        if (!chatOpen) { chatOpen = true; setSS(SS.CHAT_OPEN, '1'); }
        if (visible) hideCTA();
        return;
      }

      if (!openNow && wasChatOpen) {
        chatOpen = false;
        setSS(SS.CHAT_OPEN, '0');
        setSS(SS.CHAT_CLOSED_TIME, String(now()));
        setLS(LS.LAST_CLOSE, String(now()));
        clearTimeout(reShowTimer);
        reShowTimer = setTimeout(function() {
          if (!chatOpen && !visible && !detectChatVisible() && getSS(SS.CHAT_OPEN) !== '1') {
            rmSS(SS.SUPPRESS);
            updateMessage();
            showCTA({ deepScroll: deepScroll, longStay: longStay });
          }
        }, UX.reShowDelayMs);
        return;
      }

      if (!openNow && !chatOpen && !sessionChatOpen && !visible && canShow() && !detectChatVisible()) {
        updateMessage();
        showCTA({ deepScroll: deepScroll, longStay: longStay });
      }
    }, UX.enforceEveryMs);
  }

  function observeVF() {
    var checkLauncher = function() {
      var launcher = document.querySelector('.vfrc-launcher, button.vfrc-launcher');
      if (!launcher) return;
      var cs = window.getComputedStyle(launcher);
      var launcherVisible = cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      if (!launcherVisible && !chatOpen) {
        chatOpen = true;
        setSS(SS.CHAT_OPEN, '1');
        if (visible) hideCTA();
      } else if (launcherVisible && chatOpen) {
        chatOpen = false;
        setSS(SS.CHAT_OPEN, '0');
        setSS(SS.CHAT_CLOSED_TIME, String(now()));
      }
    };
    var mo = new MutationObserver(checkLauncher);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    var launcher = document.querySelector('.vfrc-launcher, button.vfrc-launcher');
    if (launcher) {
      new MutationObserver(checkLauncher).observe(launcher, { attributes: true, attributeFilter: ['style', 'class'] });
    }
  }

  function markChatOpened() {
    setSS(SS.CHAT_OPEN, '1');
    setSS(SS.USER_OPENED_CHAT, '1');
    setSS(SS.SUPPRESS, '1');
    chatOpen = true;
    hideCTA();
  }

  function bindOpenChatButton() {
    var btn = document.getElementById('morice-open');
    if (btn) {
      btn.addEventListener('click', function() {
        try { window.voiceflow.chat.open(); } catch (_) {}
        setSS(SS.SUPPRESS, '1');
        markChatOpened();
      });
    }
  }

  function bindLauncherClick() {
    var LAUNCHER_SEL = '.vfrc-launcher__container, .vfrc-launcher__inner, .vfrc-widget__launcher, .vfrc-launcher, .vfrc-button[title="Open chat agent"], [data-testid="vfrc-launcher"], [data-voiceflow-launcher]';
    var HOST_SEL = '#voiceflow-chat, #voiceflow-chat-widget';

    document.addEventListener('click', function(e) {
      var target = e.target;
      if (!target) return;
      var path = (typeof e.composedPath === 'function') ? e.composedPath() : [];
      for (var i = 0; i < path.length; i++) {
        if (path[i] && path[i].matches && path[i].matches(LAUNCHER_SEL)) { markChatOpened(); return; }
      }
      if (target.closest && target.closest(LAUNCHER_SEL)) { markChatOpened(); return; }
      var hosts = document.querySelectorAll(HOST_SEL);
      for (var j = 0; j < hosts.length; j++) {
        var sr = hosts[j] && hosts[j].shadowRoot;
        if (!sr || !sr.contains(target)) continue;
        for (var k = 0; k < path.length; k++) {
          if (path[k] && path[k].matches && path[k].matches(LAUNCHER_SEL)) { markChatOpened(); return; }
        }
      }
    }, true);
  }

  function handleChatClosed() {
    rmSS(SS.CHAT_OPEN);
    chatOpen = false;
    rmSS(SS.USER_OPENED_CHAT);
    setSS(SS.CHAT_CLOSED_TIME, String(now()));
    setLS(LS.LAST_CLOSE, String(now()));
    clearTimeout(reShowTimer);
    reShowTimer = setTimeout(function() {
      if (!chatOpen && !detectChatVisible()) {
        rmSS(SS.SUPPRESS);
        updateMessage();
        showCTA({ deepScroll: deepScroll, longStay: longStay });
      }
    }, UX.reShowDelayMs);
  }

  function bindCloseButtons() {
    var CLOSE_SEL = 'button[title="Close chat agent"], [aria-label="Close"], .vfrc-header__button, .vfrc-close, .vfrc-close-button, [data-testid="vfrc-header-close"]';
    var HOST_SEL = '#voiceflow-chat, #voiceflow-chat-widget';

    document.addEventListener('click', function(e) {
      var t = e.target;
      if (!t) return;
      var path = (typeof e.composedPath === 'function') ? e.composedPath() : [];
      for (var i = 0; i < path.length; i++) {
        if (path[i] && path[i].matches && path[i].matches(CLOSE_SEL)) { handleChatClosed(); return; }
      }
      if (t.closest && t.closest(CLOSE_SEL)) { handleChatClosed(); return; }
      var hosts = document.querySelectorAll(HOST_SEL);
      for (var j = 0; j < hosts.length; j++) {
        var sr = hosts[j] && hosts[j].shadowRoot;
        if (!sr || !sr.contains(t)) continue;
        for (var k = 0; k < path.length; k++) {
          if (path[k] && path[k].matches && path[k].matches(CLOSE_SEL)) { handleChatClosed(); return; }
        }
      }
    }, true);
  }

  function getDelayForMessageType(type, ctx) {
    var base = UX.showDelayMs;
    var tod = getTimeOfDay();
    if (type === 'default') return base + (tod === 'morning' ? 2000 : tod === 'night' ? 3000 : 1500);
    if (type === 'deep' || (ctx && ctx.deepScroll)) return base + 4000;
    if (type === 'linger' || (ctx && ctx.longStay)) return base + 5000;
    if (type === 'return_short') return base + 1000;
    if (type === 'return_medium') return base + 2000;
    if (type === 'return_long') return base + 2500;
    if (type === 'idle_reminder') return base + 6000;
    if (type === 'final_attempt') return base + 3500;
    return base + 2000;
  }

  setTimeout(function() { boot = false; }, UX.bootWindowMs);
  addEventListener('hashchange', updateMessage);

  addEventListener('message', function(evt) {
    var data = evt.data;
    if (typeof data === 'string') { try { data = JSON.parse(data); } catch (_) {} }
    if (!data || typeof data.type !== 'string') return;
    if (data.type === 'voiceflow:open') {
      setSS(SS.CHAT_OPEN, '1'); setSS(SS.USER_OPENED_CHAT, '1'); setSS(SS.SUPPRESS, '1');
      chatOpen = true; hideCTA();
    }
    if (data.type === 'voiceflow:close') {
      rmSS(SS.CHAT_OPEN); chatOpen = false; rmSS(SS.USER_OPENED_CHAT);
      setSS(SS.CHAT_CLOSED_TIME, String(now())); setLS(LS.LAST_CLOSE, String(now()));
      clearTimeout(reShowTimer);
      reShowTimer = setTimeout(function() {
        if (!chatOpen && !visible && !detectChatVisible() && getSS(SS.CHAT_OPEN) !== '1') {
          rmSS(SS.SUPPRESS); updateMessage();
          showCTA({ deepScroll: deepScroll, longStay: longStay });
        }
      }, UX.reShowDelayMs);
    }
  });

  window.PayloadWindowOnReady = function(api) {
    vfReady = true;
    vfReadyTime = now();

    try {
      if (api && api.proactive && api.proactive.push) {
        var _orig = api.proactive.push.bind(api.proactive);
        api.proactive.push = function() {
          if (detectChatVisible() || chatOpen) return;
          return _orig.apply(api.proactive, arguments);
        };
      }
    } catch (_) {}

    if (detectChatVisible() || getSS(SS.CHAT_OPEN) === '1') {
      chatOpen = true; setSS(SS.CHAT_OPEN, '1');
      if (visible) hideCTA();
    }

    metDwell = false; metScroll = false; deepScroll = false; longStay = false;
    clearTimeout(dwellTimer); clearTimeout(longTimer);

    observeVF();
    startEnforcer();

    setTimeout(function() { scheduleDwell(); scheduleLongStay(); watchScroll(); }, UX.vfReadyDelayMs);
    setTimeout(function() {
      if (!chatOpen && !detectChatVisible() && canShow()) {
        updateMessage();
        showCTA({ deepScroll: false, longStay: false });
      }
    }, UX.vfReadyDelayMs + 1500);
  };

  function bindCTA() {
    ctaEl = document.getElementById('morice-cta');
    btnOpenEl = document.getElementById('morice-open');
    btnCloseEl = document.getElementById('morice-close');
    descEl = document.getElementById('morice-text');

    if (btnOpenEl) btnOpenEl.addEventListener('click', function() {
      try { window.voiceflow.chat.open(); } catch (_) {}
      setSS(SS.SUPPRESS, '1');
      markChatOpened();
    });

    if (btnCloseEl) btnCloseEl.addEventListener('click', function() {
      setSS(SS.PAYLOAD_DISMISSED, '1');
      setSS(SS.SUPPRESS, '1');
      hideCTA();
    });
  }

  function checkChatOnLoad() {
    var attempts = 0;
    var check = function() {
      attempts++;
      if (detectChatVisible() || getSS(SS.CHAT_OPEN) === '1') {
        chatOpen = true; setSS(SS.CHAT_OPEN, '1');
        if (visible) hideCTA();
        return;
      }
      if (attempts >= 10) { rmSS(SS.SUPPRESS); chatOpen = false; return; }
      setTimeout(check, 500);
    };
    setTimeout(check, 1000);
  }

  function init() {
    showCount = parseInt(getSS(SS.SHOW_COUNT) || '0');
    sessionStart = parseInt(getSS(SS.SESSION_START) || String(now()));
    setSS(SS.SESSION_START, String(sessionStart));

    injectCSS();
    injectCTA();
    bindCTA();
    bindOpenChatButton();
    bindLauncherClick();
    bindCloseButtons();
    startEnforcer();
    observeVF();

    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible' && !metDwell) scheduleDwell();
    });

    if (getSS(SS.CHAT_OPEN) === '1') {
      chatOpen = true; setSS(SS.CHAT_OPEN, '1');
      if (visible) hideCTA();
    } else {
      checkChatOnLoad();
    }
  }

  window.PayloadWindow = { show: showCTA, hide: hideCTA };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window, document);
