import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "react-query";
import { getFeed } from "./neo-ws.api";

interface ThisRows {
  name: string;
  time: Date;
}

const TodayAsteroidSpreadsheet: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const query = useQuery({
    queryFn: () => getFeed({ detailed: true, start_date: today }),
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query.isSuccess &&
            query.data.data.near_earth_objects[today].map(row => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.close_approach_data[0].close_approach_date_full}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodayAsteroidSpreadsheet;
