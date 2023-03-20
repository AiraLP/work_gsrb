{"version":3,"file":"recent-list.bundle.map.js","names":["this","BX","Messenger","v2","exports","ui_designTokens","im_v2_provider_service","im_v2_lib_oldChatEmbedding_menu","main_date","ui_vue3_vuex","main_popup","im_v2_component_oldChatEmbedding_elements","im_v2_lib_logger","im_v2_lib_utils","main_core","main_core_events","im_v2_const","NewUserPopup","name","props","title","type","String","required","text","emits","mounted","MessengerProxy","playNewUserSound","setCloseTimer","onClosePopupHandler","onClosePopup","bind","EventEmitter","subscribe","EventType","dialog","closePopup","beforeUnmount","unsubscribe","methods","onClick","$emit","onMouseOver","clearTimeout","closeTimeout","onMouseLeave","time","setTimeout","template","RecentItem","components","Avatar","ChatTitle","item","Object","compactMode","Boolean","default","isVisibleOnScreen","data","showNewUserPopup","computed","AvatarSize","formattedDate","needsBirthdayPlaceholder","$Bitrix","Loc","getMessage","formatDate","message","date","messageText","isUser","$store","getters","dialogId","hiddenMessageText","ChatTypes","open","statusIcon","isLastMessageAuthor","isBot","isSelfChat","status","MessageStatus","error","liked","delivered","formattedCounter","counter","user","currentUserId","state","application","common","userId","isChat","id","bot","senderId","lastMessageAuthorAvatar","authorDialog","avatar","lastMessageAuthorAvatarStyle","backgroundImage","isChatMuted","isMuted","muteList","find","element","showBirthdays","RecentSettings","showBirthday","showLastMessage","invitation","newUserPopupContainer","watch","newValue","oldValue","isActive","openNewUserPopup","isSliderOpened","newUserPopup","getNewUserPopup","show","$nextTick","setOffset","offsetTop","popupContainer","offsetHeight","offsetLeft","offsetWidth","adjustPosition","PopupManager","create","bindElement","$refs","container","bindOptions","forceBindPosition","className","cacheable","animation","showClassName","closeClassName","closeAnimationType","onNewUserPopupClick","event","target","altKey","OpenTarget","current","auto","emit","onNewUserPopupClose","close","format","ActiveCall","RecentCallStatus","chatData","call","associatedEntity","advanced","chatType","DialogType","private","isTabWithActiveCall","getCallController","hasActiveCall","avatarStyle","avatarText","Utils","getFirstLetters","isDarkTheme","options","darkTheme","formattedName","htmlspecialcharsback","mapState","onJoinClick","joinMenu","destroy","getJoinMenu","onHangupClick","leaveCurrentCall","joined","unfold","$event","onRightClick","MenuManager","darkMode","items","onclick","joinCall","SettingsManager","static","instance","constructor","store","Data","get","initSettings","onSettingsChangeHandler","onSettingsChange","settingsChange","platform","isBitrixDesktop","Type","isUndefined","desktop","addCustomEvent","settings","console","initGeneralSettings","initRecentSettings","initialSettings","entries","SettingsMap","forEach","oldName","getOption","dispatch","RecentSettingsMap","Logger","warn","generalSettings","recentSettings","value","keys","includes","BroadcastManager","super","setEventNamespace","eventNamespace","init","isSupported","window","BroadcastChannel","channel","channelName","addEventListener","sendRecentList","recentData","postMessage","events","recentListUpdate","CallManager","onCallCreatedHandler","onCallCreated","getData","Call","Event","onJoin","onCallJoin","onLeave","onCallLeave","onDestroy","onCallDestroy","waiting","fields","DraftManager","initDraftHistory","onSetDraftHandler","onSetDraft","recent","setDraftMessage","history","getTextareaHistory","EventHandler","subscribeToEvents","onSetCounterHandler","onSetCounter","onSetMessageHandler","onSetMessage","onHideChatHandler","onHideChat","onLeaveChatHandler","onLeaveChat","onClearLikeHandler","onClearLike","onClearHistoryHandler","onClearHistory","setCounter","setMessage","hideChat","leaveChat","clearLike","clearHistory","recentItem","toString","startsWith","getCurrentUserId","unsubscribeEvents","RecentList","LoadingState","RecentLoadingState","directives","binding","observer","observe","isLoading","visibleElements","Set","collection","sections","pinnedItems","generalItems","preparedItems","filteredCollection","filter","birthdayPlaceholder","hasBirthday","showInvited","defaultUserRecord","sort","a","b","firstDate","secondDate","pinned","transitionType","activeCalls","created","recentService","RecentService","getInstance","contextMenuManager","RecentMenu","initBroadcastManager","initObserver","managePreloadedList","manageChatOptions","loadFirstPage","then","initBirthdayCheck","clearBirthdayCheck","destroyBroadcastManager","onScroll","oneScreenRemaining","hasMoreItemsToLoad","loadNextPage","chat","shiftKey","context","openMenu","currentTarget","preventDefault","onCallClick","onCallRightClick","scrollTop","clientHeight","scrollHeight","IntersectionObserver","entry","isIntersecting","intersectionRatio","add","dataset","delete","threshold","onRecentListUpdate","setPreloadedData","broadcastManager","fourHours","day","birthdayCheckTimeout","ignorePreloadedItems","birthdayCheckInterval","setInterval","getTimeToNextMidnight","clearInterval","preloadedList","Application","params","chatOptions","ComponentLegacy","Provider","Service","LibLegacy","Main","Vue3","Vuex","Lib","Const"],"sources":["recent-list.bundle.js"],"mappings":"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"}