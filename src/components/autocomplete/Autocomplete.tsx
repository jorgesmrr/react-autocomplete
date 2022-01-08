import { MouseEventHandler, useEffect, useRef, useState } from "react";
import AutocompleteOptionComponent from "../autocomplete-option/AutocompleteOption";
import IconChevronDown from "../icons/IconChevronDown";
import IconClose from "../icons/IconClose";
import IconExclamationCircle from "../icons/IconExclamationCircle";
import Spinner from "../spinner/Spinner";
import styles from "./Autocomplete.module.css";

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

type AutocompleteValue = string | number | null;

interface AutocompleteProps {
  value?: AutocompleteValue;
  onChange?: (value: AutocompleteValue) => void;
  typedValue: string;
  onChangeTypedValue: (value: string) => void;
  options: AutocompleteOption[] | null;
  id?: string;
  label?: string;
  tabIndex?: number;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  maxOptionsHeight?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  typedValue,
  onChangeTypedValue,
  options,
  id,
  label,
  tabIndex,
  placeholder,
  disabled = false,
  isLoading = false,
  emptyMessage = "No suggestions for the typed text",
  errorMessage,
  maxOptionsHeight = "20rem",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setFocused] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState<number | null>(
    null
  );
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(
    options || []
  );

  useEffect(() => {
    let newFilteredOptions: AutocompleteOption[];
    if (typedValue.length > 0) {
      newFilteredOptions = (options || []).filter(
        (option) =>
          option.label.toLowerCase().indexOf(typedValue.toLowerCase()) >= 0
      );
    } else {
      newFilteredOptions = options || [];
    }

    setFilteredOptions(newFilteredOptions);
    setHighlightedOption(newFilteredOptions.length ? 0 : null);
  }, [typedValue, options]);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      const option = (options || []).find((option) => option.value === value);
      onChangeTypedValue(option ? option.label : "");
    } else {
      onChangeTypedValue("");
    }

    /* eslint react-hooks/exhaustive-deps: "off" */
  }, [value]);

  const selectOption = (option: AutocompleteOption | null) => {
    inputRef.current?.blur();
    onChange?.(option?.value || null);
    onChangeTypedValue(option?.label?.toString() || "");
  };

  const forceFocus = () => inputRef.current?.focus();

  const forceBlur = () => inputRef.current?.blur();

  const highlightPreviousOption = () => {
    setHighlightedOption(Math.max(0, (highlightedOption || 0) - 1));
  };

  const highlightNextOption = () => {
    setHighlightedOption(
      Math.min(filteredOptions.length - 1, (highlightedOption || 0) + 1)
    );
  };

  const selectHighlightedOption = () => {
    if (highlightedOption != null) {
      selectOption(filteredOptions[highlightedOption]);
    }
  };

  const handleClearClick = () => {
    selectOption(null);
    forceFocus();
  };

  const handleOptionMouseDown: MouseEventHandler<HTMLLIElement> = (event) => {
    // Prevent input blur when selecting an option
    event.preventDefault();
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    selectOption(option);
  };

  // Key up event to not listen to multiple events in a single press
  const keyUpOperationsMap = {
    Escape: forceBlur,
    Enter: selectHighlightedOption,
  };

  // Key down event to listen to multiple events in a single press
  const keyDownOperationsMap = {
    ArrowUp: highlightPreviousOption,
    ArrowDown: highlightNextOption,
  };

  const handleKeyUp = (key: string) => {
    keyUpOperationsMap[key as keyof typeof keyUpOperationsMap]?.();
  };

  const handleKeyDown = (key: string) => {
    keyDownOperationsMap[key as keyof typeof keyDownOperationsMap]?.();
  };

  return (
    <div className={disabled ? styles.wrapperDisabled : styles.wrapper}>
      <div
        className={
          errorMessage ? styles.inputContainerDanger : styles.inputContainer
        }
      >
        {label && id && <label htmlFor={id}>{label}</label>}
        <input
          className={styles.input}
          ref={inputRef}
          id={id}
          type="text"
          tabIndex={tabIndex}
          placeholder={placeholder}
          disabled={disabled}
          value={typedValue}
          onChange={(e) => onChangeTypedValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyUp={(e) => handleKeyUp(e.key)}
          onKeyDown={(e) => handleKeyDown(e.key)}
        />
        {typedValue.length > 0 && (
          <div className={styles.inputIcon} onClick={handleClearClick}>
            <IconClose />
          </div>
        )}
        {isLoading ? (
          <div className={styles.inputSpinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.inputIcon} onClick={forceFocus}>
            <IconChevronDown />
          </div>
        )}
      </div>

      <div className={styles.popup}>
        {errorMessage && (
          <div className={styles.errorAlert}>
            <IconExclamationCircle />
            <span>{errorMessage}</span>
          </div>
        )}

        {isFocused && !isLoading && !errorMessage && (
          <ul className={styles.list} style={{ maxHeight: maxOptionsHeight }}>
            {typedValue.length > 0 && !filteredOptions.length ? (
              <li className={`${styles.listItemDisabled}`}>{emptyMessage}</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={
                    highlightedOption === index
                      ? styles.listItemSelected
                      : styles.listItem
                  }
                  onMouseEnter={() => setHighlightedOption(index)}
                  onMouseDown={handleOptionMouseDown}
                  onClick={() => handleOptionClick(option)}
                >
                  <AutocompleteOptionComponent
                    option={option}
                    typedText={typedValue}
                  />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
