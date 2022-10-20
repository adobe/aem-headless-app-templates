import { useState } from 'react';

const ColorSwatch = ({ name, label, uid, swatch, checked }) => {
  return (
    <label
      className={`-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400 ${
        checked ? 'ring ring-offset-1' : ''
      }`}
    >
      <input
        type="radio"
        name={name}
        value={uid}
        className="sr-only"
        aria-labelledby="color-choice-0-label"
        defaultChecked={checked}
      />
      <span id="color-choice-0-label" className="sr-only">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="h-10 w-10 bg-white border border-black border-opacity-10 rounded-full"
        style={{ backgroundColor: swatch }}
      ></span>
    </label>
  );
};

const TextSwatch = ({ name, label, uid, checked }) => (
  <label
    className={`group relative border rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none  bg-white shadow-sm text-gray-900 cursor-pointer ${
      checked ? 'ring ring-offset-1' : ''
    }`}
  >
    <input
      type="radio"
      name={name}
      value={uid}
      className="sr-only"
      aria-labelledby="size-choice-6-label"
      defaultChecked={checked}
    />
    <span id="size-choice-6-label">{label}</span>

    <span
      className="pointer-events-none absolute -inset-px rounded-md"
      aria-hidden="true"
    ></span>
  </label>
);

export const ProductConfiguration = ({ options }) => {
  const [checked, setChecked] = useState({});

  return options?.map(({ uid, label, values, name = uid }) => {
    const type = values[0].swatch_data.__typename;

    return (
      <div key={uid}>
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>

        <fieldset
          className="mt-4"
          onChange={(event) => {
            const name = event.target.name;
            const value = event.target.value;
            setChecked({ ...checked, [name]: value });
          }}
        >
          <legend className="sr-only">Choose a {label}</legend>
          <div className="flex items-center space-x-3">
            {values.map(({ label, uid, swatch_data }) =>
              type === 'ColorSwatchData' ? (
                <ColorSwatch
                  name={name}
                  key={uid}
                  label={label}
                  uid={uid}
                  swatch={swatch_data.value}
                  checked={checked[name] === uid}
                />
              ) : (
                <TextSwatch
                  name={name}
                  key={uid}
                  label={label}
                  uid={uid}
                  checked={checked[name] === uid}
                />
              )
            )}
          </div>
        </fieldset>
      </div>
    );
  });
};

export default ProductConfiguration;
