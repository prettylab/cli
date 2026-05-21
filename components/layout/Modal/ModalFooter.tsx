import Flex from "@prettylab/core/components/layout/Flex/Flex";
import Button from "@prettylab/core/components/layout/Button/Button";
import { IoMdTrash } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { BiSave } from "react-icons/bi";

interface Props {
  deleteButton?: boolean;
  submitButton?: boolean;
  onDelete?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  cancelButtonLabel?: string;
  deleteButtonLabel?: string;
  loading?: boolean;
}

export default function ModalFooter({
  deleteButton,
  submitButton = true,
  onDelete,
  onCancel,
  onSubmit,
  loading,
  cancelButtonLabel = "Anuluj",
  deleteButtonLabel = "Usuń",
}: Props) {
  return (
    <Flex between alignCenter>
      <Flex>
        {deleteButton && (
          <Button
            startIcon={<IoMdTrash />}
            variant="contained"
            color="error"
            sx={{ py: 1, fontWeight: "normal" }}
            onClick={onDelete}
            loading={loading}
          >
            {deleteButtonLabel}
          </Button>
        )}
      </Flex>
      <Flex end sx={{ gap: 1, mt: 1 }}>
        <Button
          startIcon={<MdCancel />}
          variant="outlined"
          sx={{ py: 1, fontWeight: "normal" }}
          onClick={onCancel}
          loading={loading}
        >
          {cancelButtonLabel}
        </Button>
        {submitButton && (
          <Button
            startIcon={<BiSave />}
            variant="contained"
            sx={{ py: 1, fontWeight: "normal" }}
            {...(!!onSubmit
              ? {
                  onClick: onSubmit,
                }
              : {
                  type: "submit",
                })}
            loading={loading}
          >
            Zapisz
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
