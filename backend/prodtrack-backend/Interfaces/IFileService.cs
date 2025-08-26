namespace Plastiki.Interfaces;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedFileExtensionStrings);

    void DeleteFile(string fileNameWithExtension);
}