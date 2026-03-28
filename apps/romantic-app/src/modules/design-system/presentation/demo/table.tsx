import { Table } from '../../../../libs/ui/table';

import { Example } from './example';

export const TableDemo = () => {
  return (
    <Example
      id="table-examples"
      title="Table"
      description="A structured container for displaying data in rows and columns with optional sorting and pagination."
    >
      <Example.Case
        id="table-basic"
        title="1) Basic"
        description="Full table with thead, tbody, and tfoot."
      >
        <Table.Root>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Difficulty</Table.Th>
              <Table.Th>Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Love Languages</Table.Td>
              <Table.Td>Compatibility</Table.Td>
              <Table.Td>Easy</Table.Td>
              <Table.Td>94</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Trust & Fidelity</Table.Td>
              <Table.Td>Relationship</Table.Td>
              <Table.Td>Medium</Table.Td>
              <Table.Td>87</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Self-Discovery</Table.Td>
              <Table.Td>Personal</Table.Td>
              <Table.Td>Hard</Table.Td>
              <Table.Td>72</Table.Td>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tfoot>
            <Table.Tr>
              <Table.Td>Total</Table.Td>
              <Table.Td />
              <Table.Td />
              <Table.Td>253</Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table.Root>
      </Example.Case>

      <Example.Case
        id="table-no-foot"
        title="2) Without footer"
        description="Table without tfoot section."
      >
        <Table.Root>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Player</Table.Th>
              <Table.Th>Rounds played</Table.Th>
              <Table.Th>Correct answers</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Alex</Table.Td>
              <Table.Td>12</Table.Td>
              <Table.Td>9</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Jordan</Table.Td>
              <Table.Td>12</Table.Td>
              <Table.Td>11</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Morgan</Table.Td>
              <Table.Td>8</Table.Td>
              <Table.Td>6</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table.Root>
      </Example.Case>
    </Example>
  );
};
