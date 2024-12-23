import { useState, useEffect, useRef, useLayoutEffect } from "react";
import type { Option, MultiSelectProps } from "./types";
import { useCombobox } from "downshift";
import { Box, Button, Flex, Input, TagLabel } from "@chakra-ui/react";
import { Tag } from "./ui/tag";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import {
  getOptions,
  getOptionLabel,
  getOptionValue,
  excludeSelectedOption,
} from "../utils/optionsUtils";

const MultiSelect = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Select options",
  colorScheme = "",
  hideSelected = false,
  isSearchable = true,
  size = "md",
  popoverProps = {},
  listProps = {},
  listItemProps = () => ({}),
  dropdownPlacement = "bottom",
  inputGroupProps = {},
  getLabel,
  getValue,
  tagHeight,
  tagWidth,
  tagBorderRadius,
  inputHeight = "40px",
  inputWidth,
  inputBorderRadius = "8px",
  buttonBorderRadius = "7px",
  width = "100%",
}: MultiSelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [effectivePlacement, setEffectivePlacement] =
    useState(dropdownPlacement);
  const [items, setItems] = useState(options);
  const [inputValue, setInputValue] = useState("");

  const calculatePlacement = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (dropdownPlacement === "top" && spaceAbove < 200) {
      setEffectivePlacement("bottom");
    } else if (dropdownPlacement === "bottom" && spaceBelow < 200) {
      setEffectivePlacement("top");
    } else {
      setEffectivePlacement(dropdownPlacement);
    }
  };

  useLayoutEffect(() => {
    calculatePlacement();
    window.addEventListener("resize", calculatePlacement);
    return () => window.removeEventListener("resize", calculatePlacement);
  }, [dropdownPlacement]);

  const {
    isOpen,
    getToggleButtonProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu,
    closeMenu,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "");
      if (isSearchable) {
        const filteredItems = getOptions(inputValue || "", options, getLabel);
        setItems(
          excludeSelectedOption(
            filteredItems,
            selectedOptions,
            hideSelected,
            getValue
          )
        );
      }
    },
    itemToString: (item) => {
      if (!item) return "";
      return getOptionLabel(item, getLabel);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;

      const isAlreadySelected = selectedOptions.some((option) =>
        getValue
          ? getValue(option) === getValue(selectedItem)
          : option.value === selectedItem.value
      );

      const updatedSelectedOptions = isAlreadySelected
        ? selectedOptions.filter((option) =>
            getValue
              ? getValue(option) !== getValue(selectedItem)
              : option.value !== selectedItem.value
          )
        : [...selectedOptions, selectedItem];

      onChange(updatedSelectedOptions);

      setInputValue("");
    },
  });

  useEffect(() => {
    if (hideSelected) {
      setItems(
        excludeSelectedOption(options, selectedOptions, hideSelected, getValue)
      );
    }
  }, [selectedOptions, hideSelected, options]);

  const handleTagClick = (optionToRemove: Option) => {
    const updatedSelectedOptions = selectedOptions.filter((option) =>
      getValue
        ? getValue(option) !== getValue(optionToRemove)
        : option.value !== optionToRemove.value
    );
    onChange(updatedSelectedOptions);
  };

  return (
    <Box ref={containerRef} position="relative" maxWidth="100%" width={width}>
      <Flex
        alignItems="center"
        border="1px solid"
        borderRadius={inputBorderRadius}
        height={inputHeight}
        bg="white"
        borderColor={colorScheme ? `${colorScheme}.500` : "black"}
        {...inputGroupProps}
      >
        <Flex alignItems="center" flexWrap="wrap" gap={1} width="100%">
          {selectedOptions.map((selectedOption) => (
            <Tag
              key={getOptionValue(selectedOption, getValue)}
              size={size}
              borderRadius={tagBorderRadius}
              height={tagHeight}
              variant="solid"
              endElement={
                <FaTimes
                  onClick={() => handleTagClick(selectedOption)}
                  cursor="pointer"
                />
              }
              bg={colorScheme ? colorScheme : "black"}
              color="white"
              colorPalette={colorScheme ? colorScheme : "black"}
            >
              <TagLabel width={tagWidth}>
                {getOptionLabel(selectedOption, getLabel)}
              </TagLabel>
            </Tag>
          ))}
          <Input
            placeholder={placeholder}
            {...getInputProps()}
            border="none"
            outline="none"
            size={size}
            height={inputHeight}
            width={inputWidth}
            borderRadius={inputBorderRadius}
            value={isSearchable ? inputValue : ""}
            position="relative"
            top={selectedOptions.length ? "-10px" : ""}
          />
        </Flex>

        <Button
          variant="ghost"
          {...getToggleButtonProps()}
          height="100%"
          borderRadius={buttonBorderRadius}
          size={size}
          bg={colorScheme ? `${colorScheme}.500` : "black"}
          color="white"
          aria-expanded={isOpen}
        >
          <FaChevronDown
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </Flex>

      <Box
        {...getMenuProps()}
        bg="white"
        border="1px solid"
        position="absolute"
        zIndex="10"
        width="100%"
        maxHeight="200px"
        overflowY="auto"
        style={{
          display: isOpen && items.length ? "block" : "none",
          top: effectivePlacement === "bottom" ? "100%" : "auto",
          bottom: effectivePlacement === "top" ? "100%" : "auto",
        }}
        borderColor={colorScheme ? `${colorScheme}.400` : "black"}
        {...popoverProps}
        {...listProps}
      >
        {items.map((item, index) => (
          <Box
            key={getOptionValue(item, getValue)}
            color={colorScheme ? colorScheme : "black"}
            bg={
              highlightedIndex === index
                ? colorScheme
                  ? `${colorScheme}.200`
                  : "gray.200"
                : "white"
            }
            p={2}
            cursor="pointer"
            borderBottom="1px solid #e2e8f0"
            {...getItemProps({ item, index })}
            {...listItemProps(item)}
          >
            {getOptionLabel(item, getLabel)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiSelect;
