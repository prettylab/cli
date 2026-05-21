import {
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

type Option = {
  label: string;
  value: any;
  subLabel?: string;
  disabled?: boolean;
};

export type UncontrolledInputRadioGroupProps = {
  options: Array<Option>;
  value?: any;
  onChange?: (event: any, value: any) => void;
  error?: string | boolean;
};

export default function InputRadioGroup({
  options,
  value,
  onChange,
  error,
  ...props
}: UncontrolledInputRadioGroupProps & Partial<RadioGroupProps>) {
  const theme = useTheme();

  return (
    <Flex column>
      <RadioGroup
        row
        sx={{ display: "flex", gap: { xs: 0, sm: 1 } }}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((item, itemIndex) => (
          <FormControlLabel
            key={itemIndex}
            sx={{ mx: 0.25, my: 1 }}
            value={item.value}
            label=""
            control={
              <Radio
                sx={{
                  p: 0,
                  opacity: item.disabled ? 0.5 : 1,
                }}
                disabled={item.disabled}
                icon={
                  <Paper
                    sx={{
                      py: 1,
                      px: 1.5,
                      bgcolor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: !!error ? theme.palette.error.main : "",
                        textAlign: "center",
                        fontSize: { xs: 14, md: 16 },
                        "& span": { fontSize: { xs: 9, md: 11 } },
                      }}
                    >
                      {item.label}
                      {item.subLabel && (
                        <>
                          <br />
                          <span>{item.subLabel}</span>
                        </>
                      )}
                    </Typography>
                  </Paper>
                }
                checkedIcon={
                  <Paper
                    sx={{
                      py: 1,
                      px: 1.5,
                      bgcolor: "#003129",
                    }}
                  >
                    <Typography
                      sx={{
                        color: !!error ? theme.palette.error.main : "white",
                        textAlign: "center",
                        fontSize: { xs: 14, md: 16 },
                        "& span": { fontSize: { xs: 9, md: 11 } },
                      }}
                    >
                      {item.label}
                      {item.subLabel && (
                        <>
                          <br />
                          <span>{item.subLabel}</span>
                        </>
                      )}
                    </Typography>
                  </Paper>
                }
              />
            }
          />
        ))}
      </RadioGroup>
      {typeof error === "string" && (
        <Typography
          sx={{ color: theme.palette.error.main, ml: 1.5, fontSize: 12 }}
        >
          {error}
        </Typography>
      )}
    </Flex>
  );
}
