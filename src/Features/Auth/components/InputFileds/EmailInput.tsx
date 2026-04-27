import { InputField as StyledInput } from "./EmailInput.style"

type InputFieldProps = {
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ type, placeholder, value, onChange }: InputFieldProps) => {
    return (
        <div>
            <StyledInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputField