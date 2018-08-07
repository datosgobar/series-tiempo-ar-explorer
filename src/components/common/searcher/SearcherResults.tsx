import * as React from 'react';
import * as ReactPaginate from "react-paginate";
import SearchResultCount from "../../style/Common/searchpage/SearchResultCount";

interface ISearcherResultsProps extends React.HTMLProps<HTMLDivElement> {
    pageCount: number;
    onPageChange: (btnClicked: any) => void;
    currentPage: number;
    totalFound: number;
}

export default (props: ISearcherResultsProps) => {
    const pageCount = props.pageCount;
    const fn = props.onPageChange;
    const currentPage = props.currentPage;
    const totalFound = props.totalFound;
    const propsAux = {...props};
    delete propsAux.pageCount;
    delete propsAux.onPageChange;
    delete propsAux.currentPage;
    delete propsAux.totalFound;

    return (
        <div>
            <div className="title-and-tags mg-b">
                <SearchResultCount totalResult={totalFound}/>
            </div>

            <div {...propsAux} />

            <ReactPaginate previousLabel={"Anterior"}
                           nextLabel={"Siguiente"}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={fn}
                           containerClassName={"pagination"}
                           activeClassName={"active"}
                           forcePage={currentPage} />
        </div>
    )
}
