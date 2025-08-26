using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Plastiki.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum EntryStatus
{
    Pending,
    Production,
    Completed
}