import { useCallback } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
    const { t, i18n } = useI18nTranslation([namespace || 'common', 'common']);

    // LOGIC: 2-Tier Fallback: domain namespace -> common -> Raw English Key
    const trans = useCallback(
        (key: string, options?: Record<string, unknown>): string => {
            return t(key, { ...options, defaultValue: key });
        },
        [t],
    );

    const changeLanguage = useCallback(
        (lang: 'vi' | 'en') => {
            return i18n.changeLanguage(lang);
        },
        [i18n],
    );

    return {
        trans,
        t: trans,
        i18n,
        currentLanguage: i18n.language,
        changeLanguage,
    };
};