// ==UserScript==
// @name        SBVideo Player
// @namespace        http://tampermonkey.net/
// @version        0.2
// @description        スマホ動画一覧ページで動画コントローラーを表示
// @author        Ameba Blog User
// @match        https://ameblo.jp/*/video*
// @match        https://static.blog-video.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @run-at        document-start
// @grant        none
// @updateURL        https://github.com/personwritep/SBVideo_Player/raw/main/SBVideo_Player.user.js
// @downloadURL        https://github.com/personwritep/SBVideo_Player/raw/main/SBVideo_Player.user.js
// ==/UserScript==


let target=document.body;
let monitor=new MutationObserver(main);
monitor.observe(target, {childList: true, subtree: true});


function main(){
    let iframe_sv=document.querySelector('iframe[src*="static.blog-video.jp"]');
    if(iframe_sv){
        let sv_src=iframe_sv.getAttribute('src');
        if(sv_src.includes('&controls=0')){
            sv_src=sv_src.replace('&controls=0', '&controls=1');
            sv_src=sv_src.replace('&autoplay=1', '&autoplay=0');
            iframe_sv.setAttribute('src', sv_src); }
    }}



if(location.hostname.includes('static.blog-video.jp')){
    let retry=0;
    let interval=setInterval(wait_target, 1);
    function wait_target(){
        retry++;
        if(retry>100){ // リトライ制限 100回 0.1secまで
            clearInterval(interval); }
        let target=document.documentElement; // 監視 target
        if(target){
            clearInterval(interval);
            environ(target); }}

    function environ(target){
        let style=
            '<style class="sbvp">'+
            '.video-bg { display: none; } '+
            'video::-webkit-media-controls-panel { '+
            'background: none !important; margin-bottom: -20px; } '+
            '#js-video-touch-area.hide { display: block !important; '+
            'height: calc(100% - 60px); outline: none; }'+
            '</style>';

        if(!document.querySelector('.sbvp')){
            target.insertAdjacentHTML('beforeend', style); }}

}



