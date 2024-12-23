import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useCombobox } from "downshift";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";
import {
  getOptions,
  getOptionLabel,
  getOptionValue,
  excludeSelectedOption,
} from "../utils/optionsUtils";
import { SingleSelectProps, Option } from "./types";

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  placeholder = "Select an option",
  width = "300px",
  height = "40px",
  size = "md",
  onChange,
  closeOnSelect = true,
  disableOption,
  hideSelected = false,
  popoverProps = {},
  listProps = {},
  listItemProps = () => ({}),
  dropdownPlacement = "bottom",
  inputGroupProps = {},
  getLabel,
  getValue,
  colorScheme = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [effectivePlacement, setEffectivePlacement] =
    useState(dropdownPlacement);
  const [items, setItems] = useState<Option[]>(options);

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
    selectedItem,
    openMenu,
    closeMenu,
  } = useCombobox<Option>({
    items,
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = getOptions(inputValue || "", options, getLabel);
      setItems(
        excludeSelectedOption(
          filteredItems,
          selectedItem,
          hideSelected,
          getValue
        )
      );
    },
    itemToString: (item) => {
      if (!item) return "";
      return disableOption && disableOption(item)
        ? ""
        : getOptionLabel(item, getLabel);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem || (disableOption && disableOption(selectedItem))) {
        openMenu();
        return;
      }
      if (closeOnSelect) {
        closeMenu();
      } else {
        openMenu();
      }

      const customLabel = getOptionLabel(selectedItem, getLabel);
      const customValue = getOptionValue(selectedItem, getValue);
      onChange?.({ label: customLabel, value: customValue });

      setItems(getOptions("", options, getLabel));
    },
  });

  useEffect(() => {
    setItems(
      excludeSelectedOption(options, selectedItem, hideSelected, getValue)
    );
  }, [selectedItem, hideSelected, options]);

  const {
    layout = "input-button",
    borderRadius = "10px",
    buttonProps = {},
    ...groupProps
  } = inputGroupProps;

  return (
    <Box ref={containerRef} position="relative" width={width}>
      <Flex
        alignItems="center"
        border="1px solid"
        borderRadius={borderRadius}
        height={height}
        bg="white"
        borderColor={colorScheme ? `${colorScheme}.500` : "black"}
        {...groupProps}
      >
        {layout === "button-input" && (
          <Button
            variant="ghost"
            {...getToggleButtonProps()}
            height="100%"
            cursor="pointer"
            size={size}
            bg={colorScheme ? `${colorScheme}.500` : "black"}
            borderRadius="9px 0 0 9px"
            color="white"
            {...buttonProps}
            aria-expanded={isOpen}
            aria-controls="dropdown-menu"
          >
            <FaChevronDown
              cursor="pointer"
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Button>
        )}

        <Input
          placeholder={placeholder}
          {...getInputProps()}
          border="none"
          outline="none"
          _focus={{ boxShadow: "none" }}
          size={size}
          borderRadius={borderRadius}
        />

        {layout === "input-button" && (
          <Button
            variant="ghost"
            {...getToggleButtonProps()}
            height="100%"
            cursor="pointer"
            size={size}
            bg={colorScheme ? `${colorScheme}.500` : "black"}
            borderRadius="0 9px 9px 0"
            color="white"
            {...buttonProps}
            aria-expanded={isOpen}
            aria-controls="dropdown-menu"
          >
            <FaChevronDown
              cursor="pointer"
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Button>
        )}
      </Flex>

      <Box
        {...getMenuProps()}
        bg="white"
        border="1px solid"
        borderRadius="md"
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
        {items.map((item, index) => {
          const isDisabled = disableOption ? disableOption(item) : false;
          return (
            <Box
              as="div"
              key={getOptionValue(item, getValue)}
              id={`dropdown-item-${index}`}
              padding="2"
              fontWeight={
                selectedItem?.value === item.value && !isDisabled
                  ? "bold"
                  : "normal"
              }
              cursor={isDisabled ? "not-allowed" : "pointer"}
              pointerEvents={isDisabled ? "none" : "auto"}
              aria-disabled={isDisabled}
              aria-selected={selectedItem?.value === item.value}
              {...(!isDisabled && getItemProps({ item, index }))}
              tabIndex={isDisabled ? -1 : 0}
              bg={
                isDisabled
                  ? "gray.100"
                  : highlightedIndex === index
                    ? colorScheme
                      ? `${colorScheme}.50`
                      : "gray.200"
                    : selectedItem?.value === item.value && !isDisabled
                      ? `${colorScheme}.50`
                      : "white"
              }
              color={
                isDisabled
                  ? "gray.500"
                  : colorScheme
                    ? `${colorScheme}.400`
                    : "black"
              }
              {...listItemProps(item, index)}
            >
              <Text>{getOptionLabel(item, getLabel)}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SingleSelect;
