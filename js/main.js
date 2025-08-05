// 言語データを保持するグローバル変数
let translations = {};

// ページが読み込まれたときに言語データを読み込む
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations(); // 全ての言語データを最初に読み込む
    const userLang = navigator.language.split('-')[0];
    const langToSet = translations[userLang] ? userLang : 'ja'; // 対応言語がなければ日本語に
    setLanguage(langToSet);
});

// 全ての言語ファイルを読み込む関数
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


// 指定された言語にページを更新する関数
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
