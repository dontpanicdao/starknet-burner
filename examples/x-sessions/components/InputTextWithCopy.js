import styled from "styled-components";

const Block = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const BlockInput = styled.input`
  width: 100%;
`;

export const InputTextWithCopy = ({ value }) => {
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log("cannot copy to clipboard");
    }
  };

  return (
    <Block>
      <BlockInput type="text" value={value} readOnly />
      <input
        type="button"
        value="Copy"
        onClick={() => {
          copy(value);
        }}
      />
    </Block>
  );
};

export default InputTextWithCopy;
