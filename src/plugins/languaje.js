// Locale
import { createI18n } from 'vue-i18n'
import { es } from '../translations/es'
import { eu } from '../translations/eu'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const messages = { es, eu }

export const i18n = createI18n({
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n
    locale: 'es',
    fallbackLocale: 'es',
    messages
})