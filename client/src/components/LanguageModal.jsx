import { useTranslation } from "react-i18next";

export default function LanguageModal({ onClose }) {
  const { i18n, t } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-8">
          {t("selectLanguage")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-lg">
          <button onClick={() => changeLang("bn")}>বাংলা</button>
          <button onClick={() => changeLang("en")}>English</button>
          <button onClick={() => changeLang("hi")}>हिंदी</button>
          <button onClick={() => changeLang("ta")}>தமிழ்</button>
          <button onClick={() => changeLang("te")}>తెలుగు</button>
        </div>
      </div>
    </div>
  );
}
