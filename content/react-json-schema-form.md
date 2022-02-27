---
title: 'React json schema form. v3.2.1'
date: '2022-02-27'
description: 'Data driven way for creating and managing React forms'
tags: ['rjsf', 'data-driven', 'react']
---

## Philosophy
- Data-driven way of creating react forms from JSON structure. 
    - The JSON structure is referred to as the schema here.
- It has quite a lot of variety for UI handling, to customise look and feel, beyond themes.
    - This is done by passing “uiSchema” 

## Installation and usage
```
npm install @rjsf/core --save
import Form from "@rjsf/core";
```
**Note :** 

Latest Reactjsonformschema version require 16+ for React.  For React 15, use 1.x version of reactjsonformschema.

**Sample Code :** 
```
import Form from "@rjsf/core";

const schema = {
  title: "Test form", // Title of the form
  description: "Exploring React json schema form", // Description of the form
  type: "string", // type of the field
  enum: ["one", "two", "three"], // Values the field can have
};

<Form
	schema={schema}
	uiSchema={uiSchema}
	formData={formData}
	onChange={(e) => setFormData(e.formData)}
	onSubmit={onSubmit}
	onError={onError}
/>
```

## Schema
It is the segregation of the individual form elements in a json format. The global level is in the parent level and the individual element configuration is inside the element property.

```
const schema = {
	title: “Here goes the title of the form”,
	type: “object”,
	properties: {
		name: {
			type: “string”,
			enum: [“name”, “age”, designation]
			enumNames: [“Name”, “Age as on 01/01/2020”, “designation in the current company”]
		},
		age: {
			type: “number”,
			enum: [1,2,3,4,5,6,7,8,9]
		}
	},
	required: [“name”],
	additionalProperties: {
		type: “number”,
		enum: [1,2,3]
	}
};

const uiSchema = {
	classNames: “custom-css-class-for-form”,
	name: {
		classNames: “custom-class-for-name-element”
	},
	“ui:title”: “This is going to override the title value”,
	“ui:description”: “This would override the description value”,
	“ui:order”: [“age”, “name”], // This is the order in which the elements comes
};

<Form schema={schema} uiSchema={uiSchema} />
```
Each property has a specific functionality
- The `type` can have values: string, object, array, number, integer, boolean, null. If the type is an object, then you have properties. The form element can have multiple types of values. Those are represented by an array.
const schema = { type: [‘string’, ‘number’] }
- The `properties` would have the types of the input form elements. Each item inside properties would have an element described.
- The `enum` have the selected values for the specific field.
- The `enumNames` is the custom names to be shown on UI for a better experience 
- The `uiSchema` key holds the UI configuration like classnames. The values can override the schema values like ui:title and ui:description can override values of title and description in the schema. ui:enumDisabled: This can disable the enum values.
- The `required` key defines the keys which are mandatory to be filled.
- The `additionalProperties` allows setting arbitrary keys and values to the form. This is like adding keys and values on the fly. There would be a button given by the library to add the type of values. Override the expandable value in `ui:options` inside uiSchema. If the value is set to false, the button would not be shown.	

## Form Data : Initialisation of a form
This is helpful in initialisation of the form. 
```
const schema = {
	type: “object”,
	properties: {
		title: { type: “string” },
		done: { type: “boolean” }		
	}
};

const formData = {
	title : “String value for title key”,
	done: true
}

<Form schema={schema} formData={formData} />
```

**Note: **
- If the form has a single field, then the formData would be just the value like formData = “Charlie”.
- If the parent component re-renders, make sure to listen to the `onChange` method and update the data in formData.
- Make sure the structure of the schema and the form data is same.

## Form Events
There are events such as “onChange”, “onError”, “onSubmit” and “onBlur” on the form component.

By default, form is an uncontrolled component, to make it controlled, we have to pass onChange method like below.
```
const [formData, setFormData] = useState(props.data);
<Form formData={formData} onChange={e => setFormData(e.formData)} schema={schema} />
```

## Schema definitions and references
We can have reusable structures which can be used to represent the structures of similar form sections like below. This uses JSON pointer.
```
const schema = {
	definitions: {
		address: {
			type: object,
			properties: {
				street_address: { type: “string” },
				pincode: { type: “number” }
			},
			required: [“street_address”, “pincode”]
		}
	},
	type: “object”,
	billing_address: { “$ref”: “#/definitions/address” },
	permanent_address: { “$ref”: “#definitions/address” }
};
```

# Dependencies
Jason schema form can define dependencies of fields
```
Const schema = {
	type: “object”,
	properties: {
		relation: { type: “string”, enum: [“father”, “mother” ]}
		gender: { type: “string”, enum: [“male”, “female”, “other” ]}
	},
	dependencies: {
		“gender”: [“relation”],
		“relation”: [“gender”]
	}
}
```

There could be bi-directional dependencies. In that case, have it under dependencies. The library also provides a section of the form to be changed depending upon what is selected.

Modifying some parts of the form depending upon some change in other fields
```
Const schema = {
	type: “object”,
	properties: {
		name: { type: “string” },
		credit_card_number: { type: “number” }
	},
	dependencies: {
		“credit_card_number”: { 
			properties: { “billing_address”: { type: “string” } },
			required: [“billing_address”]
		}
	}
}
```

More variety
```
Const schema = {
	type: “object”,
	properties: {
		“Do you have any pets ?”: { type: “string”, enum: [“none”, “one”, “more than one”], default: “none” },
		required: [“Do you have any pets ?”]
	},
	dependencies: {
		“Do you have any pets ?”: {
			“oneOf”: [
				properties: { 
					“Do you have any pets ?” : { enum: [ “none” ] },
				},
				properties: {
					“Do you have any pets ?” : { enum: [ “one” ] },
					“How old is your pet”: { type: “number” }
				},
				properties: {
					“Do you have any pets ?” : { enum: [ “more than one” ] },
					“Do you want to get rid of any”: { type: “number” },
					required: [“Do you want to get rid of any”]
				},
			]
		}
	}
}
```

## Validation
React JSON schema form uses “ajv”  validator by default. By default, the form is validated only when the form is submitted, if we want liveValidation, we have to use the attribute “liveValidate” on the form component. This is an expensive strategy. The form uses html5 validation. This again depends on the browser support. We can disable html5Validation with “noHtml5Validate”.

- Live Validation
```
<Form schema={schema} liveValidate />
```

Custom validation rules
```
Const validate = (formData, errors) => {
	if(formData.pass1 !== formData.pass2) {
		errors.pass2.addError(“Password do not match”)
	}
	return errors;
}

Const schema = {
	type: “object”,
	properties: {
		pass1: {type: “string”, minLength: 3},
		pass2: {type: “string”, minLength: 3}
	}
}

<Form schema={schema} validate={validate} />
```

**Note: **

The validate method always return errors.

### Custom Error functions
Some default error messages are provided. In case we want to change the messages, we can use the `transformErrors` function. We can have a check on `error.name` or `error.property`. error property would have the object name.

```
Const transformErrors = errors => {
	return errors.maps(error => {
		if(error.name === “pattern”) { error.message = “only digits allowed” }
		return error
	})
	return errors;
}

Const schema = {
	type: “object”, 
	properties: { name: { type: “string”, pattern: “^\\d*$” } }
}

<Form schema={schema} transformErrors={transformErrors} />

Custom Formats
Const customFormats = { ‘phone-us’: /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/ };
<Form schema={schema} customFormats={customFormats} />
```

### ExtraErrors
This is used for handling async errors. Suppose errors are sent on form submit.
```
const extraErrors = {
	foo: { __errors: ["some error that got added as a prop"] },
	candy: { bar: { __errors: ["some error that got added as a prop"] } }
};
```

## oneOf, anyOf, allOf
This is generally used in validations where the following conditions are true.
- oneOf : exactly one schema is valid
- anyOf : at least one schema is valid
- allOf : all the sub-schema are valid
```
oneOf
Const schema = {
	type: “object”,
	oneOf: [{
		properties: { typeOf: { type: “string”, enum: [“none”, “oneOf”] } }
		required: [“typeOf”]
	}, {
		properties: { name: { type: “string”}, age: { type: “number” } },
		required: [“name”]
	}]
}
```
Similarly, we have anyOf and allOf in the same fashion

## Widgets
The “ui:widget” property in “uiSchema” tells which component to render.
```
const schema = {
	type: “object”,
	properties: { done: “boolean” }	
}

const uiSchema = {
	done: { ui:widget: radio }
}
```
List of data types and ui:widgets available
### Boolean:
- Radio with values true and false
- Select with true and false
- By default, the checkbox is used/shown.
To set the labels on the fields, use enumNames in the schema. The order is always [true, false]


### String:
- Textarea
- Password
- Color
- By default, <input type=“text” /> is used
Formats: To get formats given by the browser, we can use the format property in the schema. Below are the formats supported
- Email 
- Url
- Data-url
- Date
- Date-time
```
Const schema = {
	type: object,
	properties : { email: { type: “string”, format: “email” } },
	required: [“email”]
}
```

### Number and Integer:
- updown : [input type=“number”] with up-down selector
- Range
- Radio: The values are provided in the enums
- By default, the value would be <input type=“text” />
Note: If the minimum, maximum and multiple are specified, then the “min”, “max” and “step” values are taken.

### Hidden:
Mention in the uiSchema to have hidden values in the form. Hidden values are supported for boolean, string, number and integers

### File:
This is basically <input type=“file” /> It would propagate the file contents to the data-urls
2 ways to declare:
- Type is string, and format is “data-url”
- Type is string, and ui:widget: file
And for multiple files, 
Schema would be 
```
Const schema = {
	type: array,
	items: { type: “string”, format: “data-url” }
}
const uiSchema = {
  "ui:options": { accept: ".pdf" }
};
```

## Custom widgets and custom fields
Majorly we would require our component rather than just HTML elements. In such cases, custom widgets would come into the picture. 
- Widget: That represents HTML tags like input, select, etc.
- Field: This usually wraps one or more widgets and handles the state of the widgets.

```
Const CustomCheckbox = props => {
	const {options, value} = props;
	return (
		// Component code.
		<button>{String(value)}</button>
	)
}

CustomCheckbox.defaultProps = { options: { background: “blue” } };

Const schema = { type: “boolean”, default: true };
Const uiSchema = { “ui:widget”: “checkbox” };
Const widgets = { CheckboxWidget: CustomCheckbox }

<Form schema={schema} uiSchema={uiSchema} widgets={widgets} />
```
Likewise, each of the widgets can be mapped. Below is the default widget that can be overridden like the above code.
- AltDateTimeWidget
- AltDateWidget
- CheckboxesWidget
- CheckboxWidget
- ColorWidget
- DateTimeWidget
- DateWidget
- EmailWidget
- FileWidget
- HiddenWidget
- PasswordWidget
- RadioWidget
- RangeWidget
- SelectWidget
- TextareaWidget
- TextWidget
- UpDownWidget
- URLWidget

In the widgets, the below props are passed by default by the library. 
- Id: generated dynamically
- Schema: subschema of the field
- uiSchema : uiSchema for the field 
- Value: the value of the field
- Placeholder, Required
- Disabled, read-only, autofocus
- onChange, onKeyChange, onBlur, onFocus
- Options: along with other props, we can send options.
- Options.enumOptions
- formContext: Sending the context object.
- rawErrors: Generated errors encountered by the widgets

In Field props, the below props are passed by the library
- Schema, uiSchema, idSchema
- formData
- errorSchema
- Registry
- formContext

## Resources
- https://react-jsonschema-form.readthedocs.io/en/latest/
