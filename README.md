secondaryinfo-entity-row
========================
Custom entity row for [Home Assistant](https://home-assistant.io), providing additional types of data to be displayed in the secondary info sections of the Lovelace Entities card.

## IMPORTANT
**_This module was completely rewritten for the 0.86 release of Home Assistant!  There is now an external dependency, and the old configuration options are no longer valid.  Please configure from scratch!_**

## Prerequisites
- Home Assistant >= 0.86 (tested against 0.86) 
- Thomas Lovén’s [card-tools.js](https://github.com/thomasloven/lovelace-card-tools) >= 0.3 (tested against 0.3)

## Installation Instructions
#### 1) Install Card Tools if not already installed
If you see "Can't find card-tools. [...]" in your Home Assistant UI, follow these instructions.

1. Download [card-tools.js](https://github.com/thomasloven/lovelace-card-tools/raw/master/card-tools.js) and place in `<home assistant config root>/www/card-tools.js`.

2. Add the following lines to `<home assistant config root>/ui-lovelace.yaml`

```yaml
resources:
  - url: /local/card-tools.js
    type: js
```

#### 2) Install Secondary Info Entity Row


1. Download [secondaryinfo-entity-row.js](https://github.com/MizterB/lovelace-secondaryinfo-entity-row/raw/master/secondaryinfo-entity-row.js) and place in `<home assistant config root>/www/secondaryinfo-entity-row.js`.

2. Add the following lines to `<home assistant config root>/ui-lovelace.yaml`

```yaml
resources:
  - url: /local/secondaryinfo-entity-row.js
    type: module
```
## Options
The standard [Lovelace configuration for entities](https://www.home-assistant.io/lovelace/entities/) remains valid, with the exception of `secondary_info`.

`secondary_info` should be a string value, enclosed in double-quotes, which supports the [parseTemplate syntax defined in card-tools.js](https://github.com/thomasloven/lovelace-card-tools).  Per the documentation:

```
Two things are important:

- Template must start with [[<space> and end with <space>]]
- This is not in any way the same kind of template as used in the Home Assistant configuration

The templates are parsed by reading one step at a time from the `hass.states` object.
Thus, the first part must be an entity with domain and id, e.g. `light.bed_light`, `media_player.bedroom` etc.
Next is one of:

- entity_id
- state
- attributes.<attribute>
- last_changed
- last_updated
```

## Examples

```yaml
type: entities
title: Custom Secondary Info
entities:
- entity: sun.sun
  name: Entity ID with wrapped in tag
  type: "custom:secondaryinfo-entity-row"
  secondary_info: "<b style='color:red'>[[ sun.sun.entity_id ]]</b>"
  
- entity: sun.sun
  name: Absolute time for last-changed
  type: "custom:secondaryinfo-entity-row"
  secondary_info: "[[ sun.sun.last_changed ]]"
  
- entity: sun.sun
  name: Static text
  type: "custom:secondaryinfo-entity-row"
  secondary_info: "This is the entity row for the Sun"

- entity: sun.sun
  name: Entity attribute
  type: "custom:secondaryinfo-entity-row"
  secondary_info: "Next Dawn: [[ sun.sun.attributes.next_dawn ]]"
```
