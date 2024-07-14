import { useEffect, useRef, useState } from "react";
import { languages } from "../languagesData";

const TranslatorApp = ({ onClose }) => {
    const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("tr-TR");
    const [selectedLanguageTo, setSelectedLanguageTo] = useState("en-GB");
    const [showLanguages, setShowLanguages] = useState(false);
    const [currentLanguageSelection, setCurrentLanguageSelection] = useState(null);
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [charCount, setCharCount] = useState(0)
    const maxChars = 200
    const dropdownRef = useRef(null)

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowLanguages(false)
        }
    }

    useEffect(() => {
        if (showLanguages) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showLanguages])

    const handleLanguageClick = (type) => {
        setCurrentLanguageSelection(type);
        setShowLanguages(true);
    };

    const handleLanguagesSelect = (languageCode) => {
        if (currentLanguageSelection === "from") {
            setSelectedLanguageFrom(languageCode);
        } else {
            setSelectedLanguageTo(languageCode);
        }

        setShowLanguages(false);
    };

    const handleSwapLanguages = () => {
        const temp = selectedLanguageFrom;
        setSelectedLanguageFrom(selectedLanguageTo);
        setSelectedLanguageTo(temp);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setInputText(value);
            setCharCount(value.length)
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
           e.preventDefault()
            handleTranslate()
        }
    }

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setTranslatedText("");
            return;
        }

        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${selectedLanguageFrom}|${selectedLanguageTo}`);

        const data = await response.json();

        console.log("API Response:", data);

        if (data.responseData && data.responseData.translatedText) {
            setTranslatedText(data.responseData.translatedText);
        } else if (data.matches && data.matches.length > 0) {
            // Select the first match as the translated text
            const translations = data.matches.map(match => match.translation);
            setTranslatedText(translations.join(", "));
        } else {
            setTranslatedText("Çeviri yapılamadı.");
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-4 justify-center items-center px-8 pt-12 pb-6 relative">
            <button className="absolute top-4 right-4">
                <i className="fa-solid fa-xmark text-xl text-iconColor" onClick={onClose}></i>
            </button>
            <div className="w-full min-h-20 flex justify-center items-center px-4 bg-turquoise text-darkBackground rounded-lg">
                <div className="language" onClick={() => handleLanguageClick("from")}>{languages[selectedLanguageFrom] || "English"}</div>
                <i className="fa-solid fa-arrows-rotate text-2xl mx-8 cursor-pointer" onClick={handleSwapLanguages}></i>
                <div className="language" onClick={() => handleLanguageClick("to")}>{languages[selectedLanguageTo] || "English"}</div>
            </div>
            {showLanguages && (
                <div className="w-[calc(100%-4rem)] h-[calc(100%-9rem)] bg-darkTurq absolute top-32 left-8 z-10 rounded p-4 overflow-y-scroll scrollbar-hide" ref={dropdownRef}>
                    <ul>
                        {Object.entries(languages).map(([code, name]) => (
                            <li className="cursor-pointer hover:bg-turquoise transition duration-200 p-2 rounded" key={code} onClick={() => handleLanguagesSelect(code)}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-full relative">
                <textarea className="textarea text-lightPurple" value={inputText || ""} onChange={handleInputChange} onKeyDown={handleKeyDown}></textarea>
                <div className="absolute bottom-2 right-4 text-darkBackground">{charCount}/{maxChars}</div>
            </div>
            <button className="w-12 h-12 bg-turquoise rounded-full text-2xl text-darkBackground flex justify-center items-center active:translate-y-[1px]" onClick={handleTranslate}>
                <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className="w-full">
                <textarea className="textarea text-lightPurple" value={translatedText || ""} readOnly></textarea>
            </div>
        </div>
    );
};

export default TranslatorApp;
