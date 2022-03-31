public class Emotion
{
    public double Anger { get; set; }
    public double Contempt { get; set; }
    public double Disgust { get; set; }
    public double Fear { get; set; }
    public double Happiness { get; set; }
    public double Neutral { get; set; }
    public double Sadness { get; set; }
    public double Surprise { get; set; }

    public override string ToString()
    {
        return $"{Anger},{Contempt},{Disgust},{Fear},{Happiness},{Neutral},{Sadness},{Surprise}";
    }
    public int UserId { get; set; }
}