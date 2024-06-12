declare type Candle = {
  timestamp: number,
  open: number
  high: number
  low: number
  close: number
}

declare type WebsocketResponse = {
  e: string,          // event type   
  E: number,          // event time   
  s: string,          // Option trading symbol   
  k: {                             
    t: number,        // kline start time   
    T: number,        // kline end time  
    s: string,        // Option trading symbol   
    i: string,        // candle period   
    F: number,        // first trade ID  
    L: number,        // last trade ID   
    o: string,        // open   
    c: string,        // close   
    h: string,        // high    
    l: string,        // low   
    v: string,        // volume(in contracts)   
    n: number,        // number of trades   
    x: boolean,       // current candle has been completed Y/N   
    q: string,        // completed trade amount   (in quote asset)            
    V: string,        // taker completed trade volume (in contracts)             
    Q: string         // taker trade amount(in quote asset)   
  }
}