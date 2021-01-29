import { DropdownOption } from '../field/model';
import { MasterData } from '../setting/model';
export declare class MasterDataUtils {
    static getMasterDataFromLocalStore(key: string): MasterData;
    static getMasterDataAsOptions(masterDataKey: string): Array<DropdownOption>;
}
