import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useState } from 'react';
const HospitalCard = ({ img, name = 'Empty', about, onClick }) => {
  const [open, setOpen] = useState(true);
  return (
    <Card className="mt-20 max-w-96 bg-blue-100">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={img}
          alt="card-image"
          className="h-full bg-contain bg-center "
        />
      </CardHeader>
      <CardBody>
        <div className="flex justify-between items-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <h2>Rating</h2>
        </div>
        <p className={open ? 'line-clamp-4' : 'line-clamp-none'}>{about}</p>
        <button
          className="text-black"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? 'Read more.' : 'Read less.'}
        </button>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={onClick}>Continue</Button>
      </CardFooter>
    </Card>
  );
};
export default HospitalCard;
