FROM mcr.Microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.Microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MashUpServer.csproj", "."]
RUN dotnet restore "MashUpServer.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "MashUpServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MashUpServer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MashUpServer.dll"]

