import { RtspClient } from './rtsp.es6';

// RTSP client with onvif extensions
export class OnvifRtspClient extends RtspClient {
  constructor() {
    super({
      Require: "onvif-replay"
    });
  }

  play(from, to) {
    let obj = {
      Session: this_session,
      Immediate: "yes"
    };

    if(from) {
      obj.Range = `clock=${from.toISOString()}-`;
      if(to)
        obj.Range += to.toISOString();
    }

    return this.request('PLAY', obj).then(() => {
      return this;
    });
  }

  reverse(from, to) {
    let obj = {
      Session: this_session,
      Rate-Control: "no",
      Scale: "-1.0"
    };

    if(from) {
      obj.Range = `clock=${from.toISOString()}-`;
      if(to)
        obj.Range += to.toISOString();
    }

    return this.request('PLAY', obj).then(() => {
      return this;
    });
  }
}