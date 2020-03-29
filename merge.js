const mergeTracks = (baseStrem, extraStream) => {
    if (!baseStrem.getAudioTracks().length) {
        baseStrem.addTrack(extraStream.getAudioTracks()[0])
        return baseStrem;
    }
    var context = new AudioContext();
    var baseSource = context.createMediaStreamSource(baseStrem);
    var extraSource = context.createMediaStreamSource(extraStream);
    var dest = context.createMediaStreamDestination();

    var baseGain = context.createGain();
    var extraGain = context.createGain();
    baseGain.gain.value = 0.8;
    extraGain.gain.value = 0.8;

    baseSource.connect(baseGain).connect(dest);
    extraSource.connect(extraGain).connect(dest);

    return new MediaStream([baseStrem.getVideoTracks()[0], dest.stream.getAudioTracks()[0]]);
}