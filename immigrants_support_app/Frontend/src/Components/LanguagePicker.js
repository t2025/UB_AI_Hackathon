// src/components/LanguagePicker.js

import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const LanguagePicker = () => {
    const { i18n } = useTranslation();

    const languages = [
        { value: 'en', label: 'English' },
        { value: 'hi', label: 'Hindi' },
        { value: 'es', label: 'Spanish' },
        { value: 'ne', label: 'Nepali' },
        { value: 'ar', label: 'Arabic' }
    ];

    const handleChange = (selectedOption) => {
        i18n.changeLanguage(selectedOption.value);
    };

    return (
        <Select 
            options={languages} 
            onChange={handleChange} 
            placeholder="Choose a language" 
            styles={{
                control: (base) => ({
                    ...base,
                    minHeight: '40px',
                    width: '200px',
                }),
            }}
        />
    );
};

export default LanguagePicker;
