import { AssetsPath } from './image';
import { FilterPipe } from './filter.pipe';
import { UpdateAnchor, SafeHtmlPipe, TruncatePipe, Nl2BrPipe } from './text';
import { StrToDatePipe } from './str-to-date.pipe';
import { SafePipe } from './safe.pipe';
import { FileSizePipe } from './file-size.pipe';

const Pipes = [
    AssetsPath,
    FilterPipe,
    UpdateAnchor,
    SafeHtmlPipe,
    TruncatePipe,
    StrToDatePipe,
    Nl2BrPipe,
    SafePipe,
    FileSizePipe,
];

export { Pipes };
