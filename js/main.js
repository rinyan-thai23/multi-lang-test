// --- 多言語対応の処理 ---

let translations = {};

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    const userLang = navigator.language.split('-')[0];
    const langToSet = translations[userLang] ? userLang : 'ja';
    setLanguage(langToSet);

    // FAQアコーディオンの初期化処理
    initializeFaq();
});

// 全ての翻訳ファイルを読み込む
async function loadTranslations() {
    try {
        const jaResponse = await fetch('lang/ja.json');
        translations['ja'] = await jaResponse.json();
        const enResponse = await fetch('lang/en.json');
        translations['en'] = await enResponse.json();
    } catch (error) {
        console.error('Error loading translation files:', error);
    }
}

// 言語を設定するメインの関数
function setLanguage(lang) {
    const langData = translations[lang];
    if (!langData) {
        console.error(`Language not loaded: ${lang}`);
        return;
    }

    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
}

// --- FAQアコーディオンの処理 ---

function initializeFaq() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // まずすべてのアクティブクラスと高さをリセット
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
            
            // クリックされたものがアクティブでなかった場合、開く
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}
