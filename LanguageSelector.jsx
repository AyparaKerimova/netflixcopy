import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (

      <select
        className="p-2 border rounded bg-gray-100"
        onChange={changeLanguage}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>

  );
};

export default LanguageSelector;
