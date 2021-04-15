import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import vi from '@vee-validate/i18n/dist/locale/vi.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    vi,
    en
  })
});
