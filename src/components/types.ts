/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SingleSelectProps {
    options: Option[];
    placeholder?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    colorScheme?: string;
    onChange?: (selected: Option | null) => void;
    closeOnSelect?: boolean;
    disableOption?: (option: Option) => boolean;
    hideSelected?: boolean;
    popoverProps?: Record<string, any>;
    listProps?: Record<string, any>;
    listItemProps?: (item: Option, index: number) => Record<string, any>;
    dropdownPlacement?: "top" | "bottom";
    inputGroupProps?: {
        layout?: "input-button" | "button-input";
        buttonProps?: Record<string, any>;
        [key: string]: any;
    };
    getLabel?: (option: Option) => string;
    getValue?: (option: Option) => string;
}

export interface MultiSelectProps {
    options: Option[];
    selectedOptions: Option[];
    onChange: (selected: Option[]) => void;
    placeholder?: string;
    colorScheme?: string;
    hideSelected?: boolean;
    isSearchable?: boolean;
    size?: "sm" | "md" | "lg";
    popoverProps?: Record<string, any>;
    listProps?: Record<string, any>;
    listItemProps?: Record<string, any>;
    getLabel?: (option: Option) => string;
    getValue?: (option: Option) => string;
    dropdownPlacement?: 'top' | 'bottom';
    inputGroupProps?: Record<string, any>;
    tagHeight?: string,
    tagWidth?: string,
    tagBorderRadius?: string,
    inputHeight?: string,
    inputWidth?: string,
    inputBorderRadius?: string,
    width?: string;
    buttonBorderRadius?: string;
}