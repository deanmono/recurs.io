app.factory("PianoFactory", function()
{
    var keys = [];

    // array and loop for rendering key object and note elements
    var semitones = ['B','C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb'];

    for (var i=0;i<=127;i++)
    {
        var shiftedNote = semitones.shift();
        semitones.push(shiftedNote);

        var firsttone = semitones[0];

        if ( !((firsttone  == 'Db') || (firsttone  == 'Eb') || (firsttone  == 'Gb') || (firsttone  == 'Ab') || (firsttone  == 'Bb')))
        {
            var flat = false;
        }
        else
        {
            flat = true;
        }

        var baseFrequency = 8.1757989156;
        var steps = Math.pow(1.0594630943, i);
        var frequency = baseFrequency * steps;

        var note = {
            name: semitones[0],
            frequency: frequency,
            midinote: i,
            flat: flat
        }

        keys.push(note);

    }

    return keys;

});
