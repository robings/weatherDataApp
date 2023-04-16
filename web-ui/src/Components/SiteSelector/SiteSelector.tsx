import AsyncSelect from "react-select/async";
import api from "../../api/api";
import { ActionMeta, StylesConfig } from "react-select/dist/declarations/src";
import { appStrings } from "../../constants/app.strings";

interface SelectOption {
  value: number;
  label: string;
}

const selectStyles: StylesConfig<SelectOption> = {
  container: (styles) => ({
    ...styles,
    width: "50%",
    display: "inline-block",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: "black",
      backgroundColor: isSelected ? "transparent" : "transparent",
      ":hover": {
        ...styles[":hover"],
        color: "white",
        backgroundColor: "orange",
      },
    };
  },
};

const SiteSelector = function SiteSelector(props: {
  setLocationId: (locationId: string) => void;
  loadWeatherForecast: () => void;
}) {
  const { setLocationId, loadWeatherForecast } = props;

  const defaultOptions: Array<SelectOption> = [];

  const filterOptions = async (
    inputValue: string
  ): Promise<Array<SelectOption>> => {
    if (inputValue.length < 4) {
      return [];
    }

    var siteList = await api.getSiteList(inputValue);

    var siteListAsOptions = siteList.sites.map((site) => {
      return {
        value: site.id,
        label: site.name,
      };
    });

    return siteListAsOptions;
  };

  const loadOptions = (inputValue: string) =>
    new Promise<Array<SelectOption>>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  const onChange = (
    value: SelectOption | null,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (actionMeta.action === "select-option") {
      var valueAsString: string = value?.value.toString() || "";
      setLocationId(valueAsString);
    }
  };

  return (
    <form>
      <span>
        <label htmlFor="location">Select Location</label>
        <AsyncSelect<SelectOption>
          loadOptions={loadOptions}
          cacheOptions
          defaultOptions={defaultOptions}
          onChange={onChange}
          styles={selectStyles}
          id="location"
          name="location"
        />
      </span>
      <button onClick={loadWeatherForecast}>{appStrings.refresh}</button>
    </form>
  );
};

export default SiteSelector;
