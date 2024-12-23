/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Separator,
  Container,
  VStack,
} from "@chakra-ui/react";
import SingleSelect from "./components/SingleSelect";
import MultiSelect from "./components/MultiSelect";
import type { Option } from "./components/types";

const App = () => {
  const [singleSelectValue1, setSingleSelectValue1] = useState<Option | null>(
    null
  );
  const [singleSelectValue2, setSingleSelectValue2] = useState<Option | null>(
    null
  );
  const [singleSelectValue3, setSingleSelectValue3] = useState<Option | null>(
    null
  );
  const [singleSelectValue4, setSingleSelectValue4] = useState<Option | null>(
    null
  );
  const [singleSelectValue5, setSingleSelectValue5] = useState<Option | null>(
    null
  );
  const [singleSelectValue6, setSingleSelectValue6] = useState<Option | null>(
    null
  );
  const [singleSelectValue7, setSingleSelectValue7] = useState<Option | null>(
    null
  );
  const [singleSelectValue8, setSingleSelectValue8] = useState<Option | null>(
    null
  );
  const [singleSelectValue9, setSingleSelectValue9] = useState<Option | null>(
    null
  );

  const [multiSelectValue1, setMultiSelectValue1] = useState<Option[]>([]);
  const [multiSelectValue2, setMultiSelectValue2] = useState<Option[]>([]);
  const [multiSelectValue3, setMultiSelectValue3] = useState<Option[]>([]);
  const [multiSelectValue4, setMultiSelectValue4] = useState<Option[]>([]);
  const [multiSelectValue5, setMultiSelectValue5] = useState<Option[]>([]);
  const [multiSelectValue6, setMultiSelectValue6] = useState<Option[]>([]);
  const [multiSelectValue7, setMultiSelectValue7] = useState<Option[]>([]);

  const options: Option[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
  ];

  const disableOption = (option: Option) => option.value === "option3";

  const listItemProps = (item: Option, index: number) => ({
    style: {
      color: index % 2 === 0 ? "blue" : "green",
    },
  });

  const getLabel = (option: Option) => `Label: ${option.label}`;

  return (
    <Container maxW="container.md" py={8} color="black">
      <Heading as="h1" size="xl" mb={6}>
        Select Component Documentation
      </Heading>
      <VStack align="stretch" p={8}>
        {/* SingleSelect Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            SingleSelect Examples
          </Heading>
          <Text mb={4}>
            The <strong>SingleSelect</strong> component allows users to select a
            single option from a list. Below are examples demonstrating various
            ways to customize the component.
          </Text>

          <Heading as="h3" size="md" mt={6} mb={2}>
            Basic Example
          </Heading>
          <Text mb={4}>
            A basic usage of SingleSelect with default properties.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Select an option"
            onChange={(selected) => setSingleSelectValue1(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Width
          </Heading>
          <Text mb={4}>
            The width of the dropdown can be customized using the width prop.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Custom Width"
            width="400px"
            onChange={(selected) => setSingleSelectValue2(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Height
          </Heading>
          <Text mb={4}>
            The <code>height</code> prop customizes the height of the dropdown.
            Here, the height is set to <code>50px</code>.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Custom Height"
            height="50px"
            onChange={(selected) => setSingleSelectValue3(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Width and Height
          </Heading>
          <Text mb={4}>
            Both <code>width</code> and <code>height</code> props can be used
            together to control the overall size of the dropdown. In this
            example, the width is set to <code>350px</code> and the height to{" "}
            <code>60px</code>.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Custom Width and Height"
            width="350px"
            height="60px"
            onChange={(selected) => setSingleSelectValue4(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Border Radius
          </Heading>
          <Text mb={4}>
            The <code>borderRadius</code> prop customizes the border radius of
            the dropdown. Here, the border radius is set to <code>16px</code>.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Custom Border Radius"
            borderRadius="16px"
            onChange={(selected) => setSingleSelectValue5(selected)}
            colorScheme="purple"
            getLabel={getLabel}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Size Variants
          </Heading>
          <Text mb={4}>
            The <code>size</code> prop adjusts the size of the dropdown.
            Available sizes are <code>xs</code>, <code>sm</code>,{" "}
            <code>md</code>, <code>lg</code>, <code>xl</code>, and{" "}
            <code>2xl</code>. This example uses the <code>lg</code> size.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Large Size"
            size="lg"
            onChange={(selected) => setSingleSelectValue6(selected)}
            colorScheme="red"
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Disable Specific Options
          </Heading>
          <Text mb={4}>
            The <code>disableOption</code> prop allows disabling specific
            options based on custom logic. In this example, "Option 3" is
            disabled.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Disable Option 3"
            disableOption={disableOption}
            onChange={(selected) => setSingleSelectValue7(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Hide Selected Options
          </Heading>
          <Text mb={4}>
            The <code>hideSelected</code> prop hides the selected option from
            the dropdown list. In this example, the selected option will not
            appear in the list.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Hide Selected Option"
            hideSelected={true}
            onChange={(selected) => setSingleSelectValue8(selected)}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom List Item Props
          </Heading>
          <Text mb={4}>
            The <code>listItemProps</code> prop allows customizing the
            properties of individual list items. Here, even-indexed options are
            styled blue, and odd-indexed options are styled green.
          </Text>
          <SingleSelect
            options={options}
            placeholder="Custom List Item Props"
            listItemProps={listItemProps}
            onChange={(selected) => setSingleSelectValue9(selected)}
          />
          <Separator my={6} />
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            MultiSelect Examples
          </Heading>
          <Text mb={4}>
            The <strong>MultiSelect</strong> component allows users to select
            multiple options from a list. Below are examples demonstrating its
            various customization options.
          </Text>

          <Heading as="h3" size="md" mt={6} mb={2}>
            Basic Example
          </Heading>
          <Text mb={4}>
            A basic usage of MultiSelect with default properties.
          </Text>
          <MultiSelect
            options={options}
            placeholder="Select options"
            onChange={(selected) => setMultiSelectValue1(selected)}
            selectedOptions={multiSelectValue1}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Tag Height and Width
          </Heading>
          <Text mb={4}>
            Use the <code>tagHeight</code> and <code>tagWidth</code> props to
            control the size of individual tags.
          </Text>
          <MultiSelect
            options={options}
            placeholder="Custom Tag Size"
            tagHeight="30px"
            tagWidth="100px"
            onChange={(selected) => setMultiSelectValue2(selected)}
            selectedOptions={multiSelectValue2}
          />
          <Separator my={6} />
          <Heading as="h3" size="md" mt={6} mb={2}>
            Width
          </Heading>
          <Text mb={4}>
            Set <code>width</code> of select component
          </Text>
          <MultiSelect
            options={options}
            placeholder="Hide Selected Options"
            hideSelected={true}
            onChange={(selected) => setMultiSelectValue3(selected)}
            selectedOptions={multiSelectValue3}
            width="50%"
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Hide Selected Options
          </Heading>
          <Text mb={4}>
            Set <code>hideSelected</code> to <code>true</code> to hide already
            selected options from the dropdown.
          </Text>
          <MultiSelect
            options={options}
            placeholder="Hide Selected Options"
            hideSelected={true}
            onChange={(selected) => setMultiSelectValue4(selected)}
            selectedOptions={multiSelectValue4}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Dropdown Placement
          </Heading>
          <Text mb={4}>
            Use the <code>dropdownPlacement</code> prop to control where the
            dropdown appears relative to the input. Here, the dropdown is
            displayed above the input.
          </Text>
          <MultiSelect
            options={options}
            placeholder="Dropdown Above"
            dropdownPlacement="top"
            onChange={(selected) => setMultiSelectValue5(selected)}
            selectedOptions={multiSelectValue5}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Custom Input Group Layout and isSearchable false and hideSelected
            true
          </Heading>
          <Text mb={4}>
            The <code>inputGroupProps</code> prop allows input customization
          </Text>
          <MultiSelect
            options={options}
            placeholder="Custom Input Layout"
            inputGroupProps={{ bg: "red.100" }}
            onChange={(selected) => setMultiSelectValue6(selected)}
            selectedOptions={multiSelectValue6}
            colorScheme="red"
            isSearchable={false}
            hideSelected={true}
          />
          <Separator my={6} />

          <Heading as="h3" size="md" mt={6} mb={2}>
            Color Scheme Example
          </Heading>
          <Text mb={4}>
            The <code>colorScheme</code> prop allows you to apply a custom color
            scheme. This example uses a <code>blue</code> color scheme.
          </Text>
          <MultiSelect
            options={options}
            placeholder="Blue Color Scheme"
            colorScheme="blue"
            onChange={(selected) => setMultiSelectValue7(selected)}
            selectedOptions={multiSelectValue7}
          />
          <Separator my={6} />
        </Box>
      </VStack>
    </Container>
  );
};

export default App;
