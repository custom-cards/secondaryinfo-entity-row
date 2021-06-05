console.info(
  `%c SECONDARYINFO-ENTITY-ROW  \n%c  Version 0.6  `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray",
 );

var Lit = Lit || Object.getPrototypeOf(customElements.get("ha-panel-lovelace") || customElements.get('hui-view'));
var html = Lit.prototype.html;

const helpers = await window.loadCardHelpers();

export async function parseTemplate(hass, str, specialData = {}) {
  if (typeof(specialData === "string")) specialData = {};
    specialData = Object.assign({
      user: hass.user.name,
      hash: location.hash.substr(1) || ' ',
    },
    specialData);

    for (var k in specialData) {
      var re = new RegExp(`\\{${k}\\}`, "g");
      str = str.replace(re, specialData[k]);
    }

    return hass.callApi("POST", "template", {template: str});
};

    class SecondaryInfoEntityRow extends Lit {

        render() {
            return html`
                ${this._wrappedElement}
            `;
        }

        setConfig(config) {
            cardTools.checkVersion(2.0);
            this._config = config;
            this._wrappedElement = this._createElement(config);
            this.requestUpdate();
        }

        set hass(hass) {
            this._hass = hass;
            this._stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
            this._updateElement(this._wrappedElement, hass);
        }

        _createElement(config) {
            // Override the custom row type in order to create the 'standard' row for this entity
            let defaultRowConfig = Object.assign({}, config);
            delete defaultRowConfig.type;
            const element = helpers.createRowElement(defaultRowConfig);
            return element;
        }

        async _updateElement(wrappedElement, hass) {
            if (!wrappedElement) return;

            this._wrappedElement.hass = hass;
            await this._wrappedElement.updateComplete;
            await this._wrappedElement.shadowRoot.querySelector("hui-generic-entity-row");
            let secondaryInfoDiv = this._wrappedElement.shadowRoot.querySelector("hui-generic-entity-row").shadowRoot.querySelector(".secondary");
            if (secondaryInfoDiv && this._config.secondary_info) {
                let text;
                if (this._config.secondary_info.includes('{{') || this._config.secondary_info.includes('{%')) {
                    text = await parseTemplate(hass, this._config.secondary_info, {entity: this._config.entity})
                } else {
                    text = parseTemplate(this._config.secondary_info, {entity: this._config.entity});
                }
                secondaryInfoDiv.innerHTML = text;
            }
        }
    }
    customElements.define('secondaryinfo-entity-row', SecondaryInfoEntityRowCard);
