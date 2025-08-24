namespace Plastiki.Utils;

public static class FileUtils
{
    public static readonly string[] AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    public static bool InvalidFileSize(long? size)
    {
        return size > 1 * 1024 * 1024;
    }
}