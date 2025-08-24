using Plastiki.Interfaces;

namespace Plastiki.Service;

public class FileService(IWebHostEnvironment environment) : IFileService
{
    public async Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedFileExtensionStrings)
    {
        var path = Environment.GetEnvironmentVariable("UPLOAD_PATH") ?? "Uploads";

        if (!Directory.Exists(path))
        {
            try
            {
                Directory.CreateDirectory(path);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating directory: {ex.Message}");
                throw;
            }
        }

        var ext = Path.GetExtension(imageFile.FileName);
        if (!allowedFileExtensionStrings.Contains(ext))
        {
            throw new BadHttpRequestException("Extension not supported");
        }

        var fileName = Path.GetFileName(imageFile.FileName);
        var sanitizedFileName = string.Concat(fileName.Split(Path.GetInvalidFileNameChars()));
        var uniqueFileName = $"{Path.GetFileNameWithoutExtension(sanitizedFileName)}_{Guid.NewGuid()}{ext}";
        var fileNameWithPath = Path.Combine(path, uniqueFileName);

        try
        {
            await using var steam = new FileStream(fileNameWithPath, FileMode.Create);
            await imageFile.CopyToAsync(steam);
            return uniqueFileName;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving file: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            throw new IOException("An error occurred while saving the file.", ex);
        }
    }

    public void DeleteFile(string fileNameWithExtension)
    {
        var contentPath = environment.ContentRootPath;
        var path = Path.Combine(contentPath, "Uploads", fileNameWithExtension);
        if (File.Exists(path))
        {
            File.Delete(path);
        }
    }
}