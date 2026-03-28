import { useState } from 'react';

import { Pagination } from '../../../../libs/ui/pagination';

import { Example } from './example';

export const PaginationDemo = () => {
  const [controlledPage, setControlledPage] = useState(3);

  return (
    <Example
      id="pagination-examples"
      title="Pagination"
      description="A control that divides large sets of content into pages and allows users to navigate between them."
    >
      <Example.Case
        id="pagination-basic"
        title="1) Basic (Uncontrolled)"
        description="Uncontrolled pagination with defaultPage. State is managed internally."
      >
        <div className="space-y-4">
          <Pagination.Root defaultPage={1} totalPages={10}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Page />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination.Root>
          <p className="b3">
            Total pages: 10. Navigate freely — state is internal.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="pagination-controlled"
        title="2) Controlled"
        description="Controlled pagination with external state. Current page is displayed externally."
      >
        <div className="space-y-4">
          <Pagination.Root
            page={controlledPage}
            totalPages={10}
            onPageChange={setControlledPage}
          >
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Page />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination.Root>
          <p className="b2">
            Current page: <strong>{controlledPage}</strong>
          </p>
          <p className="b3">State is lifted to parent via onPageChange.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="pagination-single"
        title="3) Single Page"
        description="When totalPages is 1, all navigation buttons are disabled."
      >
        <div className="space-y-4">
          <Pagination.Root defaultPage={1} totalPages={1}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Page />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination.Root>
          <p className="b3">All buttons are disabled — only one page exists.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="pagination-many"
        title="4) Many Pages"
        description="Pagination across a large dataset with 100 total pages."
      >
        <div className="space-y-4">
          <Pagination.Root defaultPage={50} totalPages={100}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Page />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination.Root>
          <p className="b3">Total pages: 100. Starting at page 50.</p>
        </div>
      </Example.Case>
    </Example>
  );
};
