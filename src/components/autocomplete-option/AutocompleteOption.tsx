import { AutocompleteOption as AutocompleteOptionType } from "../autocomplete/Autocomplete";
import styles from "./AutocompleteOption.module.css";

interface AutocompleteOptionProps {
  option: AutocompleteOptionType;
  typedText: string;
}

const AutocompleteOption: React.FC<AutocompleteOptionProps> = ({
  option,
  typedText,
}) => {
  const highlightIndex = option.label
    .toLowerCase()
    .indexOf(typedText.toLowerCase());

  // we need this to show the correct letter cases
  const highlightedText = option.label.substring(
    highlightIndex,
    highlightIndex + typedText.length
  );

  const textBefore = option.label.substring(0, highlightIndex);
  const textAfter = option.label.substring(highlightIndex + typedText.length);

  return (
    <>
      <span>{textBefore}</span>
      <span className={styles.highlight}>{highlightedText}</span>
      <span>{textAfter}</span>
    </>
  );
};

export default AutocompleteOption;
