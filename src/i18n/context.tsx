import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import { ParentComponent } from 'solid-js';

const dict = {
  it: {
    order: 'ordine',
    menu: 'menu',
    pizzas: 'pizze',
    beverages: 'bevande',
    total: 'totale',
    order_copied: 'ordine copiato',
    empty_order:
      "Non hai aggiunto nessun prodotto all'ordine. Torna indietro per selezionare dei prodotti.",
  },
};

const value = createI18nContext(dict, 'it');

export const Provider: ParentComponent = props => {
  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
};
