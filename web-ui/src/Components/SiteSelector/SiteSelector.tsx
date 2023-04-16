import AsyncSelect from "react-select/async";
import api from "../../api/api";
import { ActionMeta } from "react-select/dist/declarations/src";

interface SelectOption {
  value: number;
  label: string;
}

const SiteSelector = function SiteSelector(props: {
  setLocationId: (locationId: string) => void;
}) {
  const { setLocationId } = props;

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
    <div>
      <label>Select Site</label>
      <AsyncSelect
        loadOptions={loadOptions}
        cacheOptions
        defaultOptions={defaultOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default SiteSelector;
