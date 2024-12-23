# Select Component Documentation

This documentation covers the **SingleSelect** and **MultiSelect** components, including their props, customization options, and example use cases.

---

## **SingleSelect Component**

The **SingleSelect** component allows users to select a single option from a dropdown list. It supports various customization options to control its appearance and behavior.

### **Props**

| Prop             | Type                | Default   | Description                                                                 |
|------------------|---------------------|-----------|-----------------------------------------------------------------------------|
| `options`        | `Option[]`         | `[]`      | List of options available for selection. Each option has `label` and `value`. |
| `placeholder`    | `string`           | `"Select"`| Placeholder text displayed in the dropdown before a selection is made.     |
| `width`          | `string`           | `"auto"`  | Sets the width of the dropdown. Accepts values like `300px` or `100%`.     |
| `height`         | `string`           | `"auto"`  | Sets the height of the dropdown.                                           |
| `borderRadius`   | `string`           | `"4px"`   | Controls the border radius of the dropdown.                                |
| `size`           | `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"` | `"md"` | Adjusts the size of the dropdown.                                          |
| `disableOption`  | `(option: Option) => boolean` | `undefined` | Disables specific options based on a custom function.                      |
| `hideSelected`   | `boolean`          | `false`   | Hides the currently selected option from the dropdown list.                |
| `listItemProps`  | `(item: Option, index: number) => object` | `undefined` | Customizes styles or props for each list item.                             |
| `colorScheme`    | `"red" | "blue" | "green" | ...` | `"blue"` | Changes the color scheme of the dropdown.                                  |

---

### **Examples**

#### 1. **Basic Example**
A simple dropdown with default properties.

```tsx
<SingleSelect
  options={[
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ]}
  placeholder="Select an option"
  onChange={(selected) => console.log(selected)}
/>
```

---

#### 2. **Custom Width and Height**
Customizes the width and height of the dropdown.

```tsx
<SingleSelect
  options={options}
  placeholder="Custom Width and Height"
  width="300px"
  height="50px"
  onChange={(selected) => console.log(selected)}
/>
```

---

#### 3. **Disabling Specific Options**
Disables an option based on custom logic.

```tsx
const disableOption = (option: Option) => option.value === "option3";

<SingleSelect
  options={options}
  placeholder="Disable Option 3"
  disableOption={disableOption}
  onChange={(selected) => console.log(selected)}
/>
```

---

#### 4. **Custom List Item Styling**
Applies custom styles to each list item.

```tsx
const listItemProps = (item: Option, index: number) => ({
  style: { color: index % 2 === 0 ? "blue" : "green" },
});

<SingleSelect
  options={options}
  placeholder="Custom List Item Props"
  listItemProps={listItemProps}
  onChange={(selected) => console.log(selected)}
/>
```

---

## **MultiSelect Component**

The **MultiSelect** component allows users to select multiple options from a dropdown list. Tags represent selected options, and the component offers rich customization.

---

### **Props**

| Prop                | Type                 | Default   | Description                                                                 |
|---------------------|----------------------|-----------|-----------------------------------------------------------------------------|
| `options`           | `Option[]`          | `[]`      | List of options available for selection.                                   |
| `placeholder`       | `string`            | `"Select"`| Placeholder text displayed in the dropdown.                                |
| `width`             | `string`            | `"auto"`  | Sets the width of the dropdown.                                            |
| `tagHeight`         | `string`            | `"auto"`  | Controls the height of individual tags.                                    |
| `tagWidth`          | `string`            | `"auto"`  | Controls the width of individual tags.                                     |
| `hideSelected`      | `boolean`           | `false`   | Hides already selected options from the dropdown.                          |
| `dropdownPlacement` | `"top" | "bottom"`  | `"bottom"`| Sets the position of the dropdown relative to the input.                   |
| `isSearchable`      | `boolean`           | `true`    | Enables or disables the search functionality in the dropdown.              |
| `inputGroupProps`   | `object`            | `{}`      | Customizes the styles or props of the input group.                         |
| `colorScheme`       | `"red" | "blue" | "green" | ...` | `"blue"` | Changes the color scheme of the dropdown.                                  |

---

### **Examples**

#### 1. **Basic Example**
A simple multi-select dropdown with default properties.

```tsx
<MultiSelect
  options={options}
  placeholder="Select options"
  onChange={(selected) => console.log(selected)}
  selectedOptions={[]}
/>
```

---

#### 2. **Hide Selected Options**
Hides selected options from the dropdown list.

```tsx
<MultiSelect
  options={options}
  placeholder="Hide Selected Options"
  hideSelected={true}
  onChange={(selected) => console.log(selected)}
  selectedOptions={[]}
/>
```

---

#### 3. **Custom Tag Size**
Customizes the height and width of the tags representing selected options.

```tsx
<MultiSelect
  options={options}
  placeholder="Custom Tag Size"
  tagHeight="30px"
  tagWidth="100px"
  onChange={(selected) => console.log(selected)}
  selectedOptions={[]}
/>
```

---

#### 4. **Dropdown Placement**
Places the dropdown above the input field.

```tsx
<MultiSelect
  options={options}
  placeholder="Dropdown Above"
  dropdownPlacement="top"
  onChange={(selected) => console.log(selected)}
  selectedOptions={[]}
/>
```

---

#### 5. **Color Scheme**
Applies a custom color scheme to the component.

```tsx
<MultiSelect
  options={options}
  placeholder="Custom Color Scheme"
  colorScheme="green"
  onChange={(selected) => console.log(selected)}
  selectedOptions={[]}
/>
```

---

## **Notes on Dropdown Placement**

If `dropdownPlacement` is set to `"top"` but there is not enough space above the input field, the dropdown will automatically be placed below. Similarly, if `dropdownPlacement` is set to `"bottom"` and there is insufficient space below, the dropdown will adjust and appear above.

---

## **Common Types**

### **Option**
```ts
type Option = {
  label: string; // The text displayed for the option.
  value: string; // The value associated with the option.
};
```

---

## **Customization Notes**

1. **Styling:** Both components support Chakra UI styling props, allowing easy integration with a design system.
2. **State Management:** Use React state (`useState`) to track the selected values.
3. **Dynamic Options:** Options can be dynamically updated based on external data sources or user interactions.

