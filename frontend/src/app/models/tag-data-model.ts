/**
 * Tag Data Events
 *  
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Tag Data
 */
export interface TagDataModel { 
    /**
     * \"CRC\" will report the CRC bits of the inventoried tag as a hex string.
     */
    CRC?: string;
    /**
     * \"PC\" will report the PC bits of the inventoried tag as a hex string.
     */
    PC?: string;
    /**
     * \"TID\" will report the entire contents of the TID bank as a hex string.
     */
    TID?: string;
    /**
     * \"USER\" will report the entire contents of the USER bank as a hex string.
     */
    USER?: string;
    /**
     * “ANTENNA” will report the antenna port upon which the tag was inventoried.
     */
    antenna?: number;
    /**
     * \"CHANNEL” will report the channel (in MHz) the reader was using when the tag was inventoried. This value will only be reported if each individual tag read is reported (in other words, if reportFilter duration is set to 0). Otherwise, it will not be reported.
     */
    channel?: number;
    /**
     * Event Number
     */
    eventNum: number;
    /**
     * The format of idHex is EPC
     */
    format: string;
    /**
     * \"EPC\" will report the entire contents of the EPC bank as a hex string.
     */
    idHex: string;
    /**
     * “RSSI” will report the rssi (in dbm) of the inventoried tag. If the tag is only reported occasionally (see reportFilter), this tag will be the peak rssi since the last reported read.
     */
    peakRssi?: number;
    /**
     * \"PHASE” will report the phase (in degrees) of the inventoried tag. This value will only be reported if each individual tag read is reported (in other words, if reportFilter duration is set to 0). Otherwise, it will not be reported.
     */
    phase?: number;
    /**
     * “SEEN_COUNT” will report the number of times the tag has been inventoried since the previous report. This value will always be 1 if each individual tag read is reported (in other words, if reportFilter duration is set to 0). 
     */
    reads?: number;
    /**
     * \"XPC\" will report the XPC bits of the inventoried tag, if present, as a hex string. 
     */
    XPC?: string;
    /**
     * "User Defined field"
     */
    userDefined?: string;
}