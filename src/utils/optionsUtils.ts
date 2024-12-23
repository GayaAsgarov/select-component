/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from "../components/types";

export const getOptions = (
    inputValue: string,
    options: Option[],
    getLabel?: (option: Option) => string
): Option[] => {
    const lowerCasedInput = inputValue.toLowerCase();
    return options.filter((option) => {
        const label = getLabel ? getLabel(option) : option.label;
        return label.toLowerCase().includes(lowerCasedInput);
    });
};

export const getOptionLabel = (
    option: Option,
    getLabel?: (option: Option) => string
): string => {
    return getLabel ? getLabel(option) : option.label;
};

export const getOptionValue = (
    option: Option,
    getValue?: (option: Option) => string
): string => {
    return getValue ? getValue(option) : option.value;
};

export const excludeSelectedOption = (
    options: Option[],
    selectedOptions: Option | Option[] | null,
    hideSelected: boolean,
    getValue?: (option: Option) => string
): Option[] => {
    if (!hideSelected || !selectedOptions) return options;

    const selectedValues = Array.isArray(selectedOptions)
        ? selectedOptions.map((selected) =>
            getValue ? getValue(selected) : selected.value
        )
        : [getValue ? getValue(selectedOptions) : selectedOptions.value];

    return options.filter(
        (option) =>
            !selectedValues.includes(getValue ? getValue(option) : option.value)
    );
};
