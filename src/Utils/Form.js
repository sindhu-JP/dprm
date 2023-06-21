import _ from "lodash";

const getOptions = (masterdata, mapping) => {
  let options = _.get(masterdata, mapping, []);

  return options.map((option) => ({
    ...option,
    label: option.name,
    value: option.code,
  }));
};

const populateFieldOptions = (masterdata, sections) => {
  let populated = [];

  sections.map((section) => {
    let newSection = { ...section };

    if (section.fields) {
      newSection.fields = section.fields.map((field) => {
        if (field.mapping) {
          return {
            ...field,
            options: getOptions(masterdata, field.mapping),
          };
        }

        return field;
      });
    }

    populated.push(newSection);
  });
  return populated;
};

export default {
  populateFieldOptions,
};
