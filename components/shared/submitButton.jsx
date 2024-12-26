
import { Button } from "../ui/button";
import Loader from "./loader";

const SubmitButton = ({ isLoading, className, children }) => {
  return (
    <Button variant="ghost" type="submit" disabled={isLoading} className={className}>
      {isLoading  ? (
        <div className="flex items-center gap-4">
          <Loader />
          Yuklanmoqda...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
